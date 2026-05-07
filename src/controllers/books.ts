import { randomUUID } from "node:crypto";
import type { Request, Response } from "express";
import { bookInputSchema as itemInputSchema, type BookInput as ItemInput } from "../schemas/item.js";
// Kita tetap pakai alias 'Book' dari store biar gak error importnya dulu
import type { Book as Item } from "../store/books.js";
import {
  createItemInDatabase,
  deleteBookFromDatabase,
  findBookById,
  listItemsWithExchange, // Fungsi sakti kita tadi
  updateBookInDatabase
} from "../services/books.js";
import type { ErrorBody, PaginatedBody, SuccessBody } from "../types/api.js";

type ItemParams = { id: string };
type ItemListQuery = { page?: string; limit?: string };

// Pesan error diganti biar sesuai konteks Gudang
const notFound = (res: Response<ErrorBody>, message = "Barang tidak ditemukan") => {
  return res.status(404).json({
    error: { code: "ITEM_NOT_FOUND", message }
  });
};

const validationError = (res: Response<ErrorBody>, issues: Record<string, string[] | undefined>) => {
  return res.status(400).json({
    error: { code: "VALIDATION_ERROR", message: "Data barang tidak valid", issues }
  });
};

// --- CONTROLLER UTAMA ---

export const listBooks = async (
  req: Request<Record<string, never>, PaginatedBody<any>, never, ItemListQuery>,
  res: Response<PaginatedBody<any>>
) => {
  const page = Number(req.query.page ?? 1);
  const limit = Number(req.query.limit ?? 10);

  // Pakai 'await' karena sekarang kita ambil data kurs dari internet (API Luar)
  const result = await listItemsWithExchange(page, limit);

  return res.json({
    data: result.data,
    meta: { page, limit, total: result.total }
  });
};

export const createBook = (
  req: Request<Record<string, never>, SuccessBody<any> | ErrorBody, any>,
  res: Response<SuccessBody<any> | ErrorBody>
) => {
  const parsed = itemInputSchema.safeParse(req.body);

  if (!parsed.success) {
    return validationError(res, parsed.error.flatten().fieldErrors);
  }

  const item = {
    id: `item-${randomUUID().substring(0, 5)}`, // ID unik pendek buat barang
    ...parsed.data,
    createdAt: new Date().toISOString()
  };

  return res.status(201).json({ data: createItemInDatabase(item) });
};

export const getBookById = (req: Request<ItemParams, any>, res: Response<any>) => {
  const item = findBookById(req.params.id);
  if (!item) return notFound(res);
  return res.json({ data: item });
};

// Update & Delete tinggal panggil service yang sudah ada
export const updateBook = (req: Request<ItemParams, any, any>, res: Response<any>) => {
  const parsed = itemInputSchema.safeParse(req.body);
  if (!parsed.success) return validationError(res, parsed.error.flatten().fieldErrors);

  const updated = updateBookInDatabase(req.params.id, parsed.data);
  if (!updated) return notFound(res);
  return res.json({ data: updated });
};

export const deleteBook = (req: Request<ItemParams, any>, res: Response<any>) => {
  const deleted = deleteBookFromDatabase(req.params.id);
  if (!deleted) return notFound(res);
  return res.status(204).send();
};