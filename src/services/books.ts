// src/services/books.ts
import { db } from "../db/database.js";
import type { BookInput } from "../schemas/item.js";
import type { Book } from "../store/books.js";

type ItemRow = {
  id: string;
  name: string;
  category: string;
  price_usd: number;
  stock: number;
  created_at: string;
};

const toItem = (row: ItemRow): Book => {
  return {
    id: row.id,
    name: row.name,
    category: row.category,
    price_usd: row.price_usd,
    stock: row.stock,
    createdAt: row.created_at
  };
};

// --- FUNGSI LIST (DENGAN INTEROP API KURS) ---
export const listItemsWithExchange = async (page: number, limit: number) => {
  const offset = (page - 1) * limit;

  const rows = db
    .prepare("SELECT * FROM items ORDER BY created_at ASC LIMIT ? OFFSET ?")
    .all(limit, offset) as ItemRow[];

  const countRow = db.prepare("SELECT COUNT(*) AS total FROM items").get() as { total: number };

  let rateIDR = 15000;
  try {
    const response = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
    const data = await response.json();
    rateIDR = data.rates.IDR;
  } catch (e) {
    console.log("Gagal ambil kurs, pakai rate default");
  }

  const itemsWithPrice = rows.map(row => {
    const item = toItem(row);
    return {
      ...item,
      priceIdr: Math.round(item.price_usd * rateIDR),
      conversionRate: `1 USD = Rp${rateIDR.toLocaleString('id-ID')}`
    };
  });

  return { data: itemsWithPrice, total: countRow.total };
};

// --- FUNGSI CREATE ---
export const createItemInDatabase = (item: Book) => {
  db.prepare(
    `INSERT INTO items (id, name, category, price_usd, stock, created_at) VALUES (?, ?, ?, ?, ?, ?)`
  ).run(item.id, item.name, item.category, item.price_usd, item.stock, item.createdAt);
  return item;
};

// --- FUNGSI FIND BY ID ---
export const findBookById = (id: string) => {
  const row = db
    .prepare("SELECT * FROM items WHERE id = ?")
    .get(id) as ItemRow | undefined;

  return row ? toItem(row) : null;
};

// --- FUNGSI UPDATE ---
export const updateBookInDatabase = (id: string, input: BookInput) => {
  const current = findBookById(id);
  if (!current) return null;

  db.prepare(
    `UPDATE items SET name = ?, category = ?, price_usd = ?, stock = ? WHERE id = ?`
  ).run(input.name, input.category, input.price_usd, input.stock, id);

  return { ...current, ...input };
};

// --- FUNGSI DELETE ---
export const deleteBookFromDatabase = (id: string) => {
  const current = findBookById(id);
  if (!current) return false;

  db.prepare("DELETE FROM items WHERE id = ?").run(id);
  return true;
};