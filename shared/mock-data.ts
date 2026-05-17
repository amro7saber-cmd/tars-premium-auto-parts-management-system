import type { InventoryPart, Vehicle, Sale, Supplier } from './types';
export const MOCK_VEHICLES: Vehicle[] = [
  { id: 'v1', Make: 'Toyota', Model: 'Camry', Year_Range: '2018-2023', Engine_Type: '2.5L' },
  { id: 'v2', Make: 'Hyundai', Model: 'Elantra', Year_Range: '2016-2020', Engine_Type: '1.6L' },
  { id: 'v3', Make: 'Nissan', Model: 'Sunny', Year_Range: '2013-2021', Engine_Type: '1.5L' },
];
export const MOCK_PARTS: InventoryPart[] = [
  {
    id: 'p1',
    Part_Name: 'تيل فرامل أمامي',
    OEM_Number: '04465-33471',
    Brand: 'Toyota Genuine',
    Origin: 'Japan',
    Shelf_Location: 'A-12',
    Current_Stock: 4,
    Reorder_Level: 10,
    Cost_Price: 120,
    Selling_Price: 185,
    Compatible_Vehicles: ['v1']
  },
  {
    id: 'p2',
    Part_Name: 'فلتر زيت',
    OEM_Number: '26300-35503',
    Brand: 'Mobis',
    Origin: 'Korea',
    Shelf_Location: 'B-04',
    Current_Stock: 45,
    Reorder_Level: 15,
    Cost_Price: 15,
    Selling_Price: 35,
    Compatible_Vehicles: ['v2']
  },
  {
    id: 'p3',
    Part_Name: 'مساعد خلفي يمين',
    OEM_Number: '56210-3AW0A',
    Brand: 'KYB',
    Origin: 'Japan',
    Shelf_Location: 'D-09',
    Current_Stock: 2,
    Reorder_Level: 5,
    Cost_Price: 280,
    Selling_Price: 420,
    Compatible_Vehicles: ['v3']
  }
];
export const MOCK_SALES: Sale[] = [
  {
    id: 's1',
    Customer_Name: 'أحمد علي',
    Items: [{ Part_ID: 'p1', Part_Name: 'تيل فرامل أمامي', Quantity: 1, Price_At_Sale: 185 }],
    Total_Amount: 185,
    Payment_Method: 'Cash',
    Timestamp: Date.now() - 86400000
  }
];
export const MOCK_SUPPLIERS: Supplier[] = [
  { id: 'sup1', Name: 'شركة النور لقطع الغيار', Contact_Person: 'محمود ابراهيم', Phone: '01012345678', Email: 'alnoor@parts.com' }
];