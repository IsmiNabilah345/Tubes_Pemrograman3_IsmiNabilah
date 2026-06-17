import type { Request, Response } from "express";
import { randomUUID } from "node:crypto";
import bcrypt from "bcrypt";

import { generateToken } from "../services/auth.js";
import { registerSchema } from "../schemas/auth.js";
import {
  findUserByUsername,
  createUser,
  updateUserRole
} from "../services/users.js";


export const register = async (
  req: Request,
  res: Response
) => {
  const parsed = registerSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      error: parsed.error.flatten()
    });
  }

  const { username, password } = parsed.data;

  const existingUser = findUserByUsername(username);

  if (existingUser) {
    return res.status(409).json({
      message: "Username sudah digunakan"
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  createUser(
    `user-${randomUUID().substring(0, 5)}`,
    username,
    hashedPassword
  );

  return res.status(201).json({
    message: "Registrasi berhasil"
  });
};

// LOGIN LAMA (sementara jangan dihapus dulu)
export const login = async (
  req: Request,
  res: Response
) => {
  const { username, password } = req.body;

  const user =
    findUserByUsername(username);

  if (!user) {
    return res.status(401).json({
      error: {
        code: "INVALID_CREDENTIALS",
        message: "Username atau password salah"
      }
    });
  }

  const validPassword =
    await bcrypt.compare(
      password,
      user.password
    );

  if (!validPassword) {
    return res.status(401).json({
      error: {
        code: "INVALID_CREDENTIALS",
        message: "Username atau password salah"
      }
    });
  }

  const token = generateToken(
    user.username,
    user.role
  );

  return res.json({
    token,
    role: user.role
  });
};

export const changeRole = (
  req: Request,
  res: Response
) => {
  const { username, role } = req.body;

  updateUserRole(username, role);

  return res.json({
    message: `Role ${username} berhasil diubah menjadi ${role}`
  });
};