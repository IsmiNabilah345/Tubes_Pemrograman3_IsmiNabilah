import { Router } from "express";
import {
  login,
  register,
  changeRole
} from "../controllers/auth.js";

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
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Registrasi berhasil
 *       409:
 *         description: Username sudah digunakan
 */
authRouter.post("/register", register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login untuk mendapatkan JWT Token
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login berhasil
 *       401:
 *         description: Login gagal
 */
authRouter.post("/login", login);

authRouter.patch(
  "/role",
  changeRole
);