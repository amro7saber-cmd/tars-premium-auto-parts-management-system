export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
export interface InventoryPart {
  id: string;
  Part_Name: string;
  OEM_Number: string;
  Brand: string;
  Origin: string;
  Shelf_Location: string;
  Current_Stock: number;
  Reorder_Level: number;
  Cost_Price: number;
  Selling_Price: number;
  Compatible_Vehicles: string[]; // Vehicle IDs
}
export interface Vehicle {
  id: string;
  Make: string;
  Model: string;
  Year_Range: string;
  Engine_Type: string;
}
export interface Sale {
  id: string;
  Customer_Name: string;
  Items: SaleItem[];
  Total_Amount: number;
  Payment_Method: 'Cash' | 'Card' | 'Transfer';
  Timestamp: number;
}
export interface SaleItem {
  Part_ID: string;
  Part_Name: string;
  Quantity: number;
  Price_At_Sale: number;
}
export interface Supplier {
  id: string;
  Name: string;
  Contact_Person: string;
  Phone: string;
  Email: string;
}