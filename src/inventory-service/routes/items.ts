import { Router } from "express";

import {
  createBook,
  deleteBook,
  getBookById,
  listBooks,
  updateBook
} from "../controllers/items.js";
import {
  authenticate,
  requireAdmin
} from "../middlewares/auth.js";

export const itemsRouter = Router();

/**
 * @swagger
 * /api/v1/items:
 *   get:
 *     summary: Mengambil daftar seluruh barang
 *     tags:
 *       - Items
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: false
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         required: false
 *     responses:
 *       200:
 *         description: Berhasil mengambil data barang
 */
itemsRouter.get("/", listBooks);

/**
 * @swagger
 * /api/v1/items:
 *   post:
 *     summary: Menambahkan barang baru
 *     tags:
 *       - Items
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ItemInput'
 *     responses:
 *       201:
 *         description: Barang berhasil ditambahkan
 *       401:
 *         description: Token tidak valid atau tidak dikirim
 *       403:
 *         description: Akses hanya untuk admin
 */
itemsRouter.post("/", authenticate, requireAdmin, createBook);

/**
 * @swagger
 * /api/v1/items/{id}:
 *   get:
 *     summary: Mengambil detail barang berdasarkan ID
 *     tags:
 *       - Items
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detail barang ditemukan
 *       404:
 *         description: Barang tidak ditemukan
 */
itemsRouter.get("/:id", getBookById);

/**
 * @swagger
 * /api/v1/items/{id}:
 *   put:
 *     summary: Memperbarui data barang
 *     tags:
 *       - Items
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ItemInput'
 *     responses:
 *       200:
 *         description: Data berhasil diperbarui
 *       401:
 *         description: Token tidak valid atau tidak dikirim
 *       403:
 *         description: Akses hanya untuk admin
 *       404:
 *         description: Barang tidak ditemukan
 */
itemsRouter.put("/:id", authenticate, requireAdmin, updateBook);

/**
 * @swagger
 * /api/v1/items/{id}:
 *   delete:
 *     summary: Menghapus barang
 *     tags:
 *       - Items
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Barang berhasil dihapus
 *       401:
 *         description: Token tidak valid atau tidak dikirim
 *       403:
 *         description: Akses hanya untuk admin
 *       404:
 *         description: Barang tidak ditemukan
 */
itemsRouter.delete("/:id", authenticate, requireAdmin, deleteBook);
