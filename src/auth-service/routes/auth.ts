import { Router } from "express";

import {
  changeRole,
  login,
  register,
  verify
} from "../controllers/auth.js";
import { authenticate } from "../middlewares/auth.js";
import { authorize } from "../middlewares/authorize.js";

export const authRouter = Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registrasi user baru
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: nabilah
 *               password:
 *                 type: string
 *                 example: rahasia123
 *     responses:
 *       201:
 *         description: Registrasi berhasil
 *       400:
 *         description: Data registrasi tidak valid
 *       409:
 *         description: Username sudah digunakan
 */
authRouter.post("/register", register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login dan mendapatkan JWT
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: nabilah
 *               password:
 *                 type: string
 *                 example: rahasia123
 *     responses:
 *       200:
 *         description: Login berhasil
 *       401:
 *         description: Username atau password salah
 */
authRouter.post("/login", login);

/**
 * @swagger
 * /auth/verify:
 *   post:
 *     summary: Verifikasi JWT untuk komunikasi antar service
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *             properties:
 *               token:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token valid
 *       400:
 *         description: Token tidak dikirim
 *       401:
 *         description: Token tidak valid
 */
authRouter.post("/verify", verify);

/**
 * @swagger
 * /auth/role:
 *   patch:
 *     summary: Mengubah role user
 *     tags:
 *       - Authentication
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - role
 *             properties:
 *               username:
 *                 type: string
 *                 example: nabilah
 *               role:
 *                 type: string
 *                 enum:
 *                   - admin
 *                   - user
 *     responses:
 *       200:
 *         description: Role berhasil diubah
 *       401:
 *         description: Token tidak valid atau tidak dikirim
 *       403:
 *         description: Forbidden
 */
authRouter.patch(
  "/role",
  authenticate,
  authorize("admin"),
  changeRole
);
