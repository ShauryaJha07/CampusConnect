import "dotenv/config";
import cors from "cors";
import express from "express";
import { createClient } from "@supabase/supabase-js";

const { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } = process.env;
const port = Number(process.env.PORT || 3001);
const allowedOrigins = (process.env.FRONTEND_ORIGINS || "http://localhost:8000,http://127.0.0.1:8000")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
  console.error("Missing SUPABASE_URL or SUPABASE_PUBLISHABLE_KEY. Check backend/.env.");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

export function createApp() {
  const app = express();

  app.use(cors({
    origin(origin, callback) {
      // Requests from command-line tools do not send an Origin header.
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error("This website origin is not allowed by the backend."));
    }
  }));
  app.use(express.json());

  app.get("/api/events", async (_request, response) => {
    try {
      const { data, error } = await supabase.from("events").select("*");
      if (error) {
        console.error("Supabase events query failed:", error.message);
        response.status(500).json({ error: "Could not load events from Supabase." });
        return;
      }
      response.json(data ?? []);
    } catch (error) {
      console.error("Events endpoint failed:", error.message);
      response.status(500).json({ error: "Could not load events from Supabase." });
    }
  });

  return app;
}

if (process.env.NODE_ENV !== "test") {
  createApp().listen(port, () => {
    console.log(`Campus Connect API is running at http://localhost:${port}`);
  });
}
