import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "mysql",
  schema: "../db/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url: process.env.NEON_DATABASE_URL!,
  },
});