import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { Loader2 } from 'lucide-react';
const partSchema = z.object({
  Part_Name: z.string().min(2, 'الاسم مطلوب'),
  OEM_Number: z.string().min(1, 'الكود مطلوب'),
  Brand: z.string().min(1, 'العلامة التجارية مطلوبة'),
  Origin: z.string().optional().default(''),
  Shelf_Location: z.string().min(1, 'الموقع مطلوب'),
  Current_Stock: z.coerce.number().min(0),
  Reorder_Level: z.coerce.number().min(0),
  Cost_Price: z.coerce.number().min(0),
  Selling_Price: z.coerce.number().min(0),
});
type PartFormValues = z.infer<typeof partSchema>;
interface AddPartDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
export function AddPartDialog({ open, onOpenChange }: AddPartDialogProps) {
  const queryClient = useQueryClient();
  const form = useForm<PartFormValues>({
    resolver: zodResolver(partSchema),
    defaultValues: {
      Part_Name: '',
      OEM_Number: '',
      Brand: '',
      Origin: '',
      Shelf_Location: '',
      Current_Stock: 0,
      Reorder_Level: 5,
      Cost_Price: 0,
      Selling_Price: 0,
    },
  });
  const mutation = useMutation({
    mutationFn: (values: PartFormValues) => 
      api('/api/parts', {
        method: 'POST',
        body: JSON.stringify(values),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['parts'] });
      toast.success('تمت إضافة القطعة بنجاح');
      onOpenChange(false);
      form.reset();
    },
    onError: (error: Error) => {
      toast.error(`خطأ في الإضافة: ${error.message}`);
    }
  });
  function onSubmit(values: PartFormValues) {
    mutation.mutate(values);
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] p-0 overflow-hidden flex flex-col">
        <DialogHeader className="p-6 pb-2 text-right">
          <DialogTitle>إضافة صنف جديد</DialogTitle>
          <DialogDescription>أدخل بيانات قطعة الغيار الجديدة بدقة.</DialogDescription>
        </DialogHeader>
        <ScrollArea className="flex-1 p-6 pt-0">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 text-right">
              <FormField
                control={form.control}
                name="Part_Name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>اسم القطعة</FormLabel>
                    <FormControl><Input {...field} className="text-right" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="OEM_Number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>OEM / الكود</FormLabel>
                      <FormControl><Input {...field} className="text-right font-mono" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="Brand"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>العلامة التجارية</FormLabel>
                      <FormControl><Input {...field} className="text-right" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="Shelf_Location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>موقع الرف</FormLabel>
                      <FormControl><Input {...field} className="text-right font-mono" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="Origin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>بلد المنشأ</FormLabel>
                      <FormControl><Input {...field} className="text-right" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="Current_Stock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الكمية الحالية</FormLabel>
                      <FormControl><Input type="number" {...field} className="text-right" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="Reorder_Level"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>حد إعادة الطلب</FormLabel>
                      <FormControl><Input type="number" {...field} className="text-right" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="Cost_Price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>سعر التكلفة</FormLabel>
                      <FormControl><Input type="number" {...field} className="text-right" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="Selling_Price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>سعر البيع</FormLabel>
                      <FormControl><Input type="number" {...field} className="text-right" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter className="pt-4 sticky bottom-0 bg-background">
                <Button type="submit" className="w-full" disabled={mutation.isPending}>
                  {mutation.isPending ? (
                    <>
                      <Loader2 className="ms-2 h-4 w-4 animate-spin" />
                      جاري الحفظ...
                    </>
                  ) : (
                    'حفظ الصنف'
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}