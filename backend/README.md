# Campus Connect backend

This folder contains the separate Express server. It reads events from the existing Supabase `public.events` table and returns them from `GET /api/events`.

## First-time setup

1. Copy `.env.example` to `.env`.
2. Put the existing Supabase project URL and **publishable** key in `.env`.
3. Open a terminal in this folder and run `npm install`.

The backend does not need a service-role/secret key for this public read endpoint. Supabase Row Level Security still controls which event rows the publishable key can read.

## Start the backend

From this folder, run:

```powershell
npm start
```

The API listens on `http://localhost:3001`.

## Check the events endpoint

In another terminal, run:

```powershell
Invoke-RestMethod http://localhost:3001/api/events
```

The response should be a JSON array. An empty array means the request worked, but the database returned no events to this key.
