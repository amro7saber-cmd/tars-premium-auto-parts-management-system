import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, AlertCircle, MoreVertical, Plus } from 'lucide-react';
import { MOCK_PARTS } from '@shared/mock-data';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { AddPartDialog } from '@/components/inventory/AddPartDialog';
export function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const filteredParts = MOCK_PARTS.filter(part =>
    part.Part_Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    part.OEM_Number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    part.Brand.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">إدارة المخزون</h2>
          <p className="text-muted-foreground">قائمة بجميع قطع الغيار المتوفرة ومواقعها.</p>
        </div>
        <Button 
          className="shrink-0 bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
          onClick={() => setIsAddDialogOpen(true)}
        >
          <Plus className="h-4 w-4" />
          إضافة صنف جديد
        </Button>
      </div>
      <div className="flex items-center gap-4 bg-card p-4 rounded-xl border shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="ابحث بالاسم، OEM، أو العلامة التجارية..."
            className="pr-10 bg-muted/50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="flex gap-2">
          <Filter className="h-4 w-4" />
          تصفية
        </Button>
      </div>
      <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent bg-muted/30">
              <TableHead className="text-right w-[200px]">الاسم</TableHead>
              <TableHead className="text-right">OEM / الكود</TableHead>
              <TableHead className="text-right">العلامة التجارية</TableHead>
              <TableHead className="text-right">الموقع</TableHead>
              <TableHead className="text-right">الكمية</TableHead>
              <TableHead className="text-right">سعر البيع</TableHead>
              <TableHead className="text-right">الحالة</TableHead>
              <TableHead className="text-center">إجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredParts.length > 0 ? (
              filteredParts.map((part) => {
                const isLowStock = part.Current_Stock <= part.Reorder_Level;
                return (
                  <TableRow key={part.id} className={cn(isLowStock && "bg-orange-50/50 dark:bg-orange-950/10")}>
                    <TableCell className="font-semibold">{part.Part_Name}</TableCell>
                    <TableCell className="font-mono text-xs uppercase">{part.OEM_Number}</TableCell>
                    <TableCell>{part.Brand}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-mono">{part.Shelf_Location}</Badge>
                    </TableCell>
                    <TableCell>
                      <span className={cn("font-bold", isLowStock ? "text-orange-600" : "text-foreground")}>
                        {part.Current_Stock}
                      </span>
                    </TableCell>
                    <TableCell>{part.Selling_Price} ر.س</TableCell>
                    <TableCell>
                      {isLowStock ? (
                        <Badge variant="destructive" className="bg-orange-600 hover:bg-orange-700 flex w-fit items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          نقص مخزون
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">متوفر</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-10 text-muted-foreground">
                  لم يتم العثور على نتائج للبحث.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <AddPartDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} />
    </div>
  );
}