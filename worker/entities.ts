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
  /**
   * Records a sale and atomically updates stock levels for each item.
   */
  static async recordSale(env: any, sale: Sale): Promise<Sale> {
    const created = await this.create(env, sale);
    // Atomically decrement stock for each part sold
    for (const item of sale.Items) {
      const partEntity = new PartEntity(env, item.Part_ID);
      try {
        await partEntity.mutate((state) => ({
          ...state,
          Current_Stock: Math.max(0, state.Current_Stock - item.Quantity)
        }));
      } catch (e) {
        console.error(`Failed to update stock for part ${item.Part_ID}:`, e);
        // Continue with other items, even if one failes (though in a prod app you might want full rollback)
      }
    }
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