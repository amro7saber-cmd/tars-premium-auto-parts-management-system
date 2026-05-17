import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, Plus, Minus, Trash2, CreditCard, Wallet, Banknote, ShoppingCart, Loader2 } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { InventoryPart, SaleItem } from '@shared/types';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';
export function POSPage() {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState<SaleItem[]>([]);
  const [customerName, setCustomerName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'Cash' | 'Card' | 'Transfer'>('Cash');
  const { data: partsData, isLoading } = useQuery({
    queryKey: ['parts'],
    queryFn: () => api<{ items: InventoryPart[] }>('/api/parts'),
  });
  const parts = partsData?.items ?? [];
  const filteredParts = parts.filter(p =>
    p.Part_Name.includes(searchTerm) || p.OEM_Number.includes(searchTerm)
  );
  const addToCart = (part: InventoryPart) => {
    if (part.Current_Stock <= 0) {
      toast.error('هذا الصنف نفذ من المخزون');
      return;
    }
    setCart(prev => {
      const existing = prev.find(item => item.Part_ID === part.id);
      if (existing) {
        if (existing.Quantity >= part.Current_Stock) {
          toast.warning('الكمية المطلوبة تتجاوز المتاح في المخزون');
          return prev;
        }
        return prev.map(item =>
          item.Part_ID === part.id ? { ...item, Quantity: item.Quantity + 1 } : item
        );
      }
      return [...prev, {
        Part_ID: part.id,
        Part_Name: part.Part_Name,
        Quantity: 1,
        Price_At_Sale: part.Selling_Price
      }];
    });
  };
  const updateQuantity = (id: string, delta: number) => {
    const part = parts.find(p => p.id === id);
    setCart(prev => prev.map(item => {
      if (item.Part_ID === id) {
        const newQty = Math.max(1, item.Quantity + delta);
        if (part && newQty > part.Current_Stock) {
          toast.warning('لا توجد كمية كافية في المخزون');
          return item;
        }
        return { ...item, Quantity: newQty };
      }
      return item;
    }));
  };
  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.Part_ID !== id));
  };
  const checkoutMutation = useMutation({
    mutationFn: (saleData: any) => api('/api/sales', {
      method: 'POST',
      body: JSON.stringify(saleData)
    }),
    onSuccess: () => {
      toast.success('تمت عملية البيع بنجاح!');
      setCart([]);
      setCustomerName('');
      queryClient.invalidateQueries({ queryKey: ['parts'] });
      queryClient.invalidateQueries({ queryKey: ['sales'] });
    },
    onError: (error: Error) => {
      toast.error(`خطأ في العملية: ${error.message}`);
    }
  });
  const handleCheckout = () => {
    if (cart.length === 0) return;
    checkoutMutation.mutate({
      Customer_Name: customerName || 'عميل نقدي',
      Items: cart,
      Total_Amount: total,
      Payment_Method: paymentMethod
    });
  };
  const total = cart.reduce((acc, item) => acc + (item.Quantity * item.Price_At_Sale), 0);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
      <div className="lg:col-span-7 flex flex-col gap-6">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="ابحث عن قطعة غيار لإضافتها للفاتورة..."
            className="pr-10 h-14 text-lg bg-card"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <ScrollArea className="flex-1 rounded-xl border bg-card p-4 min-h-[400px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-24 w-full rounded-xl" />
              ))
            ) : filteredParts.length > 0 ? (
              filteredParts.map(part => (
                <Card 
                  key={part.id} 
                  className={cn(
                    "cursor-pointer hover:border-primary transition-colors group",
                    part.Current_Stock <= 0 && "opacity-50 grayscale cursor-not-allowed"
                  )} 
                  onClick={() => part.Current_Stock > 0 && addToCart(part)}
                >
                  <CardContent className="p-4 flex justify-between items-center">
                    <div className="flex flex-col gap-1 text-right">
                      <span className="font-bold">{part.Part_Name}</span>
                      <span className="text-xs text-muted-foreground font-mono">{part.OEM_Number}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-primary">{part.Selling_Price} ر.س</span>
                        <span className="text-[10px] text-muted-foreground">({part.Current_Stock} متوفر)</span>
                      </div>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Plus className="h-5 w-5" />
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-10 text-muted-foreground">
                لا توجد نتائج مطابقة لبحثك.
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
      <div className="lg:col-span-5 flex flex-col gap-6">
        <Card className="flex flex-col h-full shadow-lg border-primary/20 overflow-hidden min-h-[600px]">
          <CardHeader className="border-b bg-muted/30">
            <CardTitle className="text-xl">فاتورة بيع جديدة</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 p-0 flex flex-col min-h-0">
            <ScrollArea className="flex-1 p-4">
              {cart.length === 0 ? (
                <div className="text-center py-20 text-muted-foreground flex flex-col items-center gap-4">
                  <ShoppingCart className="h-12 w-12 opacity-20" />
                  <span>السلة فارغة حالياً</span>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map(item => (
                    <div key={item.Part_ID} className="flex items-center justify-between border-b pb-4">
                      <div className="flex flex-col text-right">
                        <span className="font-medium">{item.Part_Name}</span>
                        <span className="text-xs text-muted-foreground">{item.Price_At_Sale} ر.س</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center border rounded-lg overflow-hidden">
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-none" onClick={() => updateQuantity(item.Part_ID, -1)}>
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="px-3 py-1 bg-muted/50 text-sm font-bold">{item.Quantity}</span>
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-none" onClick={() => updateQuantity(item.Part_ID, 1)}>
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <Button variant="ghost" size="icon" className="text-destructive h-8 w-8" onClick={() => removeFromCart(item.Part_ID)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
            <div className="p-6 space-y-4 border-t bg-muted/10">
              <div className="space-y-2 text-right">
                <label className="text-xs font-semibold text-muted-foreground uppercase">اسم العميل</label>
                <Input placeholder="أدخل اسم العميل (اختياري)" value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="text-right" />
              </div>
              <div className="space-y-2 text-right">
                <label className="text-xs font-semibold text-muted-foreground uppercase">طريقة الدفع</label>
                <div className="grid grid-cols-3 gap-2">
                  <Button variant={paymentMethod === 'Cash' ? 'default' : 'outline'} className="flex flex-col h-14 gap-1 py-2" onClick={() => setPaymentMethod('Cash')}>
                    <Banknote className="h-4 w-4" />
                    <span className="text-[10px]">نقدي</span>
                  </Button>
                  <Button variant={paymentMethod === 'Card' ? 'default' : 'outline'} className="flex flex-col h-14 gap-1 py-2" onClick={() => setPaymentMethod('Card')}>
                    <CreditCard className="h-4 w-4" />
                    <span className="text-[10px]">بطاقة</span>
                  </Button>
                  <Button variant={paymentMethod === 'Transfer' ? 'default' : 'outline'} className="flex flex-col h-14 gap-1 py-2" onClick={() => setPaymentMethod('Transfer')}>
                    <Wallet className="h-4 w-4" />
                    <span className="text-[10px]">تحويل</span>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-6 bg-primary text-primary-foreground flex flex-col gap-4">
            <div className="flex w-full justify-between items-center">
              <span className="text-lg font-medium opacity-90">الإجمالي النهائي</span>
              <span className="text-3xl font-bold">{total.toLocaleString()} ر.س</span>
            </div>
            <Button 
              className="w-full h-14 text-xl font-bold bg-white text-primary hover:bg-white/90" 
              disabled={cart.length === 0 || checkoutMutation.isPending} 
              onClick={handleCheckout}
            >
              {checkoutMutation.isPending ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                'إتمام الطلب (Checkout)'
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}