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
import { Button } from '@/components/ui/button';
import { Search, Car, Filter, Plus } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import type { Vehicle } from '@shared/types';
import { Skeleton } from '@/components/ui/skeleton';
export function VehiclesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const { data, isLoading } = useQuery({
    queryKey: ['vehicles'],
    queryFn: () => api<{ items: Vehicle[] }>('/api/vehicles'),
  });
  const vehicles = data?.items ?? [];
  const filteredVehicles = vehicles.filter(v =>
    v.Make.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.Model.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">المركبات</h2>
          <p className="text-muted-foreground">إدارة أنواع السيارات وسنوات الموديلات المدعومة.</p>
        </div>
        <Button className="shrink-0 flex gap-2">
          <Plus className="h-4 w-4" />
          إضافة مركبة
        </Button>
      </div>
      <div className="flex items-center gap-4 bg-card p-4 rounded-xl border shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="ابحث عن شركة مصنعة أو طراز..."
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
              <TableHead className="text-right">الشركة المصنعة</TableHead>
              <TableHead className="text-right">الطراز (Model)</TableHead>
              <TableHead className="text-right">نطاق السنوات</TableHead>
              <TableHead className="text-right">نوع المحرك</TableHead>
              <TableHead className="text-center">إجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                  <TableCell><Skeleton className="h-8 w-16 mx-auto rounded-md" /></TableCell>
                </TableRow>
              ))
            ) : filteredVehicles.length > 0 ? (
              filteredVehicles.map((vehicle) => (
                <TableRow key={vehicle.id}>
                  <TableCell className="font-bold flex items-center gap-2">
                    <Car className="h-4 w-4 text-muted-foreground" />
                    {vehicle.Make}
                  </TableCell>
                  <TableCell>{vehicle.Model}</TableCell>
                  <TableCell className="font-mono">{vehicle.Year_Range}</TableCell>
                  <TableCell>{vehicle.Engine_Type}</TableCell>
                  <TableCell className="text-center">
                    <Button variant="ghost" size="sm">تعديل</Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                  لا توجد مركبات تطابق البحث.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}