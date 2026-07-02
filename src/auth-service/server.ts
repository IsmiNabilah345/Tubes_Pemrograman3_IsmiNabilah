import { config } from "dotenv";

import { app } from "./app.js";
import { initializeDatabase } from "./db/database.js";

config();
initializeDatabase();

const port = Number(process.env.AUTH_SERVICE_PORT ?? 3001);

app.listen(port, () => {
  console.log(`Auth service running on http://localhost:${port}`);
});
