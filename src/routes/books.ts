import { Router } from "express";
import {
  createBook,
  deleteBook,
  getBookById,
  listBooks,
  updateBook
} from "../controllers/books.js";
import {
  authenticate,
  requireAdmin
} from "../middlewares/auth.js";


export const booksRouter = Router();

/**
 * @swagger
 * /api/v1/items:
 *   get:
 *     summary: Mengambil daftar seluruh barang
 *     tags:
 *       - Items
 *     responses:
 *       200:
 *         description: Berhasil mengambil data barang
 */
booksRouter.get("/", listBooks);

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
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               category:
 *                 type: string
 *               price_usd:
 *                 type: number
 *               stock:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Barang berhasil ditambahkan
 */
booksRouter.post(
  "/",
  authenticate,
  requireAdmin,
  createBook
);

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
booksRouter.get("/:id", getBookById);

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
 *     responses:
 *       200:
 *         description: Data berhasil diperbarui
 *       404:
 *         description: Barang tidak ditemukan
 */
booksRouter.put(
  "/:id",
  authenticate,
  requireAdmin,
  updateBook
);

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
 *       404:
 *         description: Barang tidak ditemukan
 */
booksRouter.delete(
  "/:id",
  authenticate,
  requireAdmin,
  deleteBook
);