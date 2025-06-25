# Full Stack Address Search Application

This repository contains a full stack application for address search with map display, history tracking, and directions using Mapbox.

## Structure
- `backend/`: Node.js + Express backend
- `frontend/`: React + Vite frontend with Tailwind CSS

## Setup

### Backend
1. Navigate to `backend/`
2. Copy `.env.example` to `.env` and fill in your `MONGO_URI`, `JWT_SECRET`, and `MAPBOX_API_KEY`.
3. Install dependencies: `npm install`
4. Run server: `npm run dev`
   - Server runs on http://localhost:5000

### Frontend
1. Navigate to `frontend/`
2. Copy `.env.example` to `.env` and fill in `VITE_MAPBOX_API_KEY` (and ensure `VITE_API_URL` matches your backend URL).
3. Install dependencies: `npm install`
4. Run dev server: `npm run dev`
   - App runs on http://localhost:3000

## Features
- User authentication (signup/login) with JWT
- Address autocomplete using Mapbox Geocoding API
- Map display with Mapbox GL
- Saving search history in MongoDB
- Viewing and deleting past searches
- Directions display between current location and selected address

## Notes
- Ensure your Mapbox account allows the required API usage.
- For production, secure environment variables and consider HTTPS.
