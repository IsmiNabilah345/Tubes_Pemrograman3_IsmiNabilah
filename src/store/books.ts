// src/store/books.ts
import type { BookInput } from "../schemas/item.js";

// Kita buat tipe Book mengikuti struktur barang gudang
export type Book = BookInput & {
  id: string;
  createdAt: string;
  priceIdr?: number;         // Tambahan untuk hasil konversi
  conversionRate?: string;   // Tambahan info kurs
};

// Data awal (mock data) kita sesuaikan jadi barang
export const books: Book[] = [
  {
    id: "item-001",
    name: "Laptop Pro 2026",
    category: "Electronics",
    price_usd: 1200,
    stock: 10,
    createdAt: new Date().toISOString()
  }
];