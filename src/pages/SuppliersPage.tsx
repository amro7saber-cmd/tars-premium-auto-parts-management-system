import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, User, Phone, Mail, Plus, ExternalLink } from 'lucide-react';
import { MOCK_SUPPLIERS } from '@shared/mock-data';
export function SuppliersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredSuppliers = MOCK_SUPPLIERS.filter(s =>
    s.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.Contact_Person.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8 md:py-10 lg:py-12 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">الموردين</h2>
            <p className="text-muted-foreground">إدارة بيانات التواصل مع شركات توريد قطع الغيار.</p>
          </div>
          <Button className="shrink-0 flex gap-2">
            <Plus className="h-4 w-4" />
            إضافة مورد
          </Button>
        </div>
        <div className="relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="ابحث عن مورد بالاسم أو جهة الاتصال..."
            className="pr-10 h-12 text-lg bg-card"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSuppliers.length > 0 ? (
            filteredSuppliers.map((supplier) => (
              <Card key={supplier.id} className="hover:shadow-md transition-shadow group">
                <CardHeader className="pb-2 border-b">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl font-bold text-primary">{supplier.Name}</CardTitle>
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <User className="h-5 w-5" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-4 space-y-4">
                  <div className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                    <User className="h-4 w-4" />
                    <span className="text-sm font-medium">{supplier.Contact_Person}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                    <Phone className="h-4 w-4" />
                    <span className="text-sm font-mono">{supplier.Phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                    <Mail className="h-4 w-4" />
                    <span className="text-sm">{supplier.Email}</span>
                  </div>
                </CardContent>
                <CardFooter className="pt-2 border-t flex gap-2">
                  <Button variant="outline" className="flex-1 gap-2" asChild>
                    <a href={`tel:${supplier.Phone}`}>
                      <Phone className="h-4 w-4" />
                      اتصال
                    </a>
                  </Button>
                  <Button variant="outline" className="flex-1 gap-2" asChild>
                    <a href={`mailto:${supplier.Email}`}>
                      <Mail className="h-4 w-4" />
                      إرسال
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-20 text-muted-foreground">
              لا يوجد موردين يطابقون بحثك.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}