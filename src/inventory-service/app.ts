import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import type { NextFunction, Request, Response } from "express";

import { swaggerSpec } from "./docs/swagger.js";
import { itemsRouter } from "./routes/items.js";

export const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

app.use("/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "inventory-service"
  });
});

app.use("/api/v1/items", itemsRouter);

app.use((error: Error, _req: Request, res: Response, next: NextFunction) => {
  if (error instanceof SyntaxError && "body" in error) {
    return res.status(400).json({
      error: {
        code: "INVALID_JSON",
        message: "Body request harus berupa JSON yang valid"
      }
    });
  }

  return next(error);
});

app.use((req, res) => {
  res.status(404).json({
    error: {
      code: "NOT_FOUND",
      message: `Route ${req.method} ${req.originalUrl} tidak ditemukan`
    }
  });
});
