import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { DatabaseSync } from "node:sqlite";

const databasePath = resolve(process.cwd(), "data", "ws2026.db");

mkdirSync(dirname(databasePath), { recursive: true });

export const db = new DatabaseSync(databasePath);

export const initializeDatabase = () => {
  db.exec(`
    CREATE TABLE IF NOT EXISTS items (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      price_usd REAL NOT NULL,
      stock INTEGER NOT NULL,
      created_at TEXT NOT NULL
    )
  `);

  const countRow = db
    .prepare("SELECT COUNT(*) AS total FROM items")
    .get() as { total: number };

  if (countRow.total === 0) {
    db.prepare(
      `
        INSERT INTO items (id, name, category, price_usd, stock, created_at)
        VALUES (?, ?, ?, ?, ?, ?)
      `
    ).run(
      "item-001",
      "Laptop Pro 2026",
      "Electronics",
      1200.50,
      15,
      new Date().toISOString()
    );

    console.log("Data contoh barang berhasil dimasukkan!");
  }
};
