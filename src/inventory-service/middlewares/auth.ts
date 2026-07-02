import type { NextFunction, Request, Response } from "express";

type AuthUser = {
  username: string;
  role: string;
};

type VerifyResponse = {
  valid: boolean;
  user: AuthUser;
};

const authServiceUrl = process.env.AUTH_SERVICE_URL ?? "http://localhost:3001";

export const authenticate = async (
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
    const response = await fetch(`${authServiceUrl}/auth/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ token })
    });

    if (!response.ok) {
      return res.status(401).json({
        error: {
          code: "INVALID_TOKEN",
          message: "Token tidak valid"
        }
      });
    }

    const payload = await response.json() as VerifyResponse;
    (req as any).user = payload.user;

    return next();
  } catch {
    return res.status(503).json({
      error: {
        code: "AUTH_SERVICE_UNAVAILABLE",
        message: "Auth service tidak dapat dihubungi"
      }
    });
  }
};

export const requireAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = (req as any).user as AuthUser | undefined;

  if (user?.role !== "admin") {
    return res.status(403).json({
      error: {
        code: "FORBIDDEN",
        message: "Akses hanya untuk admin"
      }
    });
  }

  return next();
};
