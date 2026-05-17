import { IndexedEntity } from "./core-utils";
import type { InventoryPart, Vehicle, Sale, Supplier } from "@shared/types";
import { MOCK_PARTS, MOCK_VEHICLES, MOCK_SALES, MOCK_SUPPLIERS } from "@shared/mock-data";
export class PartEntity extends IndexedEntity<InventoryPart> {
  static readonly entityName = "part";
  static readonly indexName = "parts";
  static readonly initialState: InventoryPart = {
    id: "",
    Part_Name: "",
    OEM_Number: "",
    Brand: "",
    Origin: "",
    Shelf_Location: "",
    Current_Stock: 0,
    Reorder_Level: 0,
    Cost_Price: 0,
    Selling_Price: 0,
    Compatible_Vehicles: []
  };
  static seedData = MOCK_PARTS;
}
export class VehicleEntity extends IndexedEntity<Vehicle> {
  static readonly entityName = "vehicle";
  static readonly indexName = "vehicles";
  static readonly initialState: Vehicle = {
    id: "",
    Make: "",
    Model: "",
    Year_Range: "",
    Engine_Type: ""
  };
  static seedData = MOCK_VEHICLES;
}
export class SaleEntity extends IndexedEntity<Sale> {
  static readonly entityName = "sale";
  static readonly indexName = "sales";
  static readonly initialState: Sale = {
    id: "",
    Customer_Name: "",
    Items: [],
    Total_Amount: 0,
    Payment_Method: "Cash",
    Timestamp: 0
  };
  static seedData = MOCK_SALES;
  // Extension for logic: Handle stock decrement during creation
  static async recordSale(env: any, sale: Sale): Promise<Sale> {
    const created = await this.create(env, sale);
    // Placeholder for future atomic stock decrement logic
    // for (const item of sale.Items) {
    //   const part = new PartEntity(env, item.Part_ID);
    //   await part.mutate(s => ({ ...s, Current_Stock: s.Current_Stock - item.Quantity }));
    // }
    return created;
  }
}
export class SupplierEntity extends IndexedEntity<Supplier> {
  static readonly entityName = "supplier";
  static readonly indexName = "suppliers";
  static readonly initialState: Supplier = {
    id: "",
    Name: "",
    Contact_Person: "",
    Phone: "",
    Email: ""
  };
  static seedData = MOCK_SUPPLIERS;
}