import { Hono } from "hono";
import type { Env } from './core-utils';
import { PartEntity, VehicleEntity, SaleEntity, SupplierEntity } from "./entities";
import { ok, bad, notFound, isStr } from './core-utils';
export function userRoutes(app: Hono<{ Bindings: Env }>) {
  // PARTS
  app.get('/api/parts', async (c) => {
    await PartEntity.ensureSeed(c.env);
    const cq = c.req.query('cursor');
    const page = await PartEntity.list(c.env, cq ?? null, 50);
    return ok(c, page);
  });
  app.post('/api/parts', async (c) => {
    const data = await c.req.json();
    if (!data.Part_Name) return bad(c, 'Part_Name required');
    const part = await PartEntity.create(c.env, { ...data, id: crypto.randomUUID() });
    return ok(c, part);
  });
  // VEHICLES
  app.get('/api/vehicles', async (c) => {
    await VehicleEntity.ensureSeed(c.env);
    const page = await VehicleEntity.list(c.env, null, 100);
    return ok(c, page);
  });
  app.post('/api/vehicles', async (c) => {
    const data = await c.req.json();
    if (!data.Make || !data.Model) return bad(c, 'Make and Model required');
    const vehicle = await VehicleEntity.create(c.env, { ...data, id: crypto.randomUUID() });
    return ok(c, vehicle);
  });
  // SALES
  app.get('/api/sales', async (c) => {
    await SaleEntity.ensureSeed(c.env);
    const page = await SaleEntity.list(c.env, null, 20);
    return ok(c, page);
  });
  app.post('/api/sales', async (c) => {
    const data = await c.req.json();
    if (!data.Items?.length) return bad(c, 'Items required');
    const sale = await SaleEntity.recordSale(c.env, { 
      ...data, 
      id: crypto.randomUUID(), 
      Timestamp: Date.now() 
    });
    return ok(c, sale);
  });
  // SUPPLIERS
  app.get('/api/suppliers', async (c) => {
    await SupplierEntity.ensureSeed(c.env);
    const page = await SupplierEntity.list(c.env, null, 50);
    return ok(c, page);
  });
  app.post('/api/suppliers', async (c) => {
    const data = await c.req.json();
    if (!data.Name) return bad(c, 'Supplier Name required');
    const supplier = await SupplierEntity.create(c.env, { ...data, id: crypto.randomUUID() });
    return ok(c, supplier);
  });
}