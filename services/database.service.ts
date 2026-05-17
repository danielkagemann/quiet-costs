import { Cost } from "@/types/costs";
import { Space } from "@/types/spaces";
import { SQLiteDatabase } from "expo-sqlite";

async function initialize(db: SQLiteDatabase) {
  await db.execAsync(`
    PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS space (
        id   INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT    NOT NULL,
        description TEXT NOT NULL DEFAULT '',
        imageData TEXT 
    );

    CREATE TABLE IF NOT EXISTS cost (
        id             INTEGER PRIMARY KEY AUTOINCREMENT,
        name           TEXT    NOT NULL,
        amount         REAL    NOT NULL,
        isActive       INTEGER NOT NULL DEFAULT 1,
        billingCycle   TEXT    NOT NULL DEFAULT 'monthly',
        categoryId     INTEGER    NOT NULL DEFAULT 0,
        spaceId        INTEGER    NOT NULL DEFAULT 0
    );
    `);

  // Seed a default space when the table is empty
  const spaceCount = await db.getFirstAsync<{ count: number }>(
    "SELECT COUNT(*) as count FROM space",
  );
  if (spaceCount?.count === 0) {
    await db.runAsync("INSERT INTO space (name) VALUES (?)", "Allgemein");
  }
}

export const DatabaseService = {
  initialize,
  getSpaces: async (db: SQLiteDatabase) => {
    return await db.getAllAsync<Space>("SELECT * FROM space");
  },
  getCosts: async (db: SQLiteDatabase) => {
    return await db.getAllAsync<Cost>("SELECT * FROM cost");
  },
  getCostById: async (db: SQLiteDatabase, id: number) => {
    return await db.getFirstAsync<Cost>("SELECT * FROM cost WHERE id = ?", id);
  },
  getCostsForSpace: async (db: SQLiteDatabase, spaceId: number) => {
    return await db.getAllAsync<Cost>("SELECT * FROM cost WHERE spaceId = ?", [
      spaceId,
    ]);
  },
  createCost: async (db: SQLiteDatabase, cost: Cost) => {
    const { name, amount, isActive, billingCycle, categoryId, spaceId } = cost;

    await db.runAsync(
      "INSERT INTO cost (name, amount, isActive, billingCycle, categoryId, spaceId) VALUES (?, ?, ?, ?, ?, ?)",
      [name, amount, isActive ? 1 : 0, billingCycle, categoryId, spaceId],
    );
  },
  updateCost: async (db: SQLiteDatabase, cost: Cost) => {
    const { id, name, amount, isActive, billingCycle, categoryId, spaceId } =
      cost;

    await db.runAsync(
      "UPDATE cost SET name = ?, amount = ?, isActive = ?, billingCycle = ?, categoryId = ?, spaceId = ? WHERE id = ?",
      [name, amount, isActive ? 1 : 0, billingCycle, categoryId, spaceId, id],
    );
  },
  deleteCost: async (db: SQLiteDatabase, id: number) => {
    await db.runAsync("DELETE FROM cost WHERE id = ?", id);
  },
  addSpace: async (db: SQLiteDatabase, space: Space) => {
    const { name, description, imageData } = space;
    await db.runAsync(
      "INSERT INTO space (name, description, imageData) VALUES (?, ?, ?)",
      [name, description || "", imageData || null],
    );
  },
  getSpaceById: async (db: SQLiteDatabase, id: number) => {
    return await db.getFirstAsync<Space>(
      "SELECT * FROM space WHERE id = ?",
      id,
    );
  },
};
