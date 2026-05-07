// src/schemas/item.ts atau book.ts
import { z } from "zod";

export const itemInputSchema = z.object({
  name: z.string().min(1, "Nama barang harus diisi"),
  category: z.string().min(1, "Kategori harus diisi"),
  price_usd: z.number().positive("Harga harus berupa angka positif"),
  stock: z.number().int().nonnegative("Stok tidak boleh negatif"),
});

export type ItemInput = z.infer<typeof itemInputSchema>;
export const bookInputSchema = itemInputSchema;
export type BookInput = ItemInput;