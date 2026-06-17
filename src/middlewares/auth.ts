import type { NextFunction, Request, Response } from "express";
import { verifyToken } from "../services/auth.js";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      error: {
        code: "UNAUTHORIZED",
        message: "Token diperlukan"
      }
    });
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    const payload = verifyToken(token);

    (req as any).user = payload;

    next();
  } catch {
    return res.status(401).json({
      error: {
        code: "INVALID_TOKEN",
        message: "Token tidak valid"
      }
    });
  }
};

export const requireAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = (req as any).user;

  if (user.role !== "admin") {
    return res.status(403).json({
      error: {
        code: "FORBIDDEN",
        message: "Akses hanya untuk admin"
      }
    });
  }

  next();
};