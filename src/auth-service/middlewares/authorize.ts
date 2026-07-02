import type { NextFunction, Request, Response } from "express";

type AuthUser = {
  username: string;
  role: string;
};

export const authorize = (role: string) => {
  return (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const user = (req as any).user as AuthUser | undefined;

    if (user?.role !== role) {
      return res.status(403).json({
        error: {
          code: "FORBIDDEN",
          message: "Forbidden"
        }
      });
    }

    return next();
  };
};
