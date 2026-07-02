import type { NextFunction, Request, Response } from "express";

import { verifyToken } from "../services/auth.js";

type AuthUser = {
  username: string;
  role: string;
};

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({
      error: {
        code: "UNAUTHORIZED",
        message: "Token diperlukan"
      }
    });
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    const payload = verifyToken(token) as AuthUser;
    (req as any).user = payload;

    return next();
  } catch {
    return res.status(401).json({
      error: {
        code: "INVALID_TOKEN",
        message: "Token tidak valid"
      }
    });
  }
};
