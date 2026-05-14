import { SQLiteDatabase } from "expo-sqlite";

async function initialize(db: SQLiteDatabase) {
  await db.execAsync(`
    PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS space (
        id   INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT    NOT NULL,
        description TEXT NOT NULL DEFAULT ''
    );

    CREATE TABLE IF NOT EXISTS cost (
        id             INTEGER PRIMARY KEY AUTOINCREMENT,
        name           TEXT    NOT NULL,
        amount         REAL    NOT NULL,
        start_date     TEXT    NOT NULL,
        payment_method INTEGER NOT NULL DEFAULT 0,
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
    await db.runAsync("INSERT INTO space (name) VALUES (?)", "Default");
  }
}

export const DatabaseService = {
  initialize,
};
