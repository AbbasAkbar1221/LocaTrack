# 🗺️ LocaTrack – Address Search and Location History App

LocaTrack is a full-stack web application that allows users to search for locations using a debounced autocomplete search powered by Mapbox, view their location on an interactive map, and manage their location search history.

## 📌 Project Overview

LocaTrack provides a seamless location search experience with the following key features:

### ✨ Features

- 🔍 **Debounced Address Autocomplete** – Powered by Mapbox Geocoding API for fast and accurate location suggestions
- 🗺️ **Interactive Map** – Dynamic map display with user location and destination markers
- 🧾 **Location Search History** – Persistent history drawer with delete functionality
- 📦 **Full-Stack Solution** – Built with React, Node.js, Express, and MongoDB
- 🎨 **Responsive Design** – Mobile-first UI using TailwindCSS
- 🔒 **JWT Authentication** – Secure user session management
- 🌐 **Cloud Deployment** – Deployed on Render (backend) and Vercel (frontend)

---

## 🛠️ Tech Stack

### Frontend

- ✅ React 18+ with Vite
- 🎨 TailwindCSS for styling
- 🗺️ Mapbox GL JS for maps
- 🔗 Axios for API calls

### Backend

- ⚙️ Node.js & Express.js
- 💾 MongoDB with Mongoose ODM
- 🔐 JWT for authentication
- 📍 Mapbox Geocoding API integration

---

## 🚀 Quick Start

### 📋 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or cloud instance)
- Mapbox account and API key

---

## 📥 Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/locatrack.git
cd locatrack
```
### 2. Set up the backend
```bash
cd backend
npm install
```
#### Create a .env file in the /backend directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
MAPBOX_API_KEY=your_mapbox_token
```
#### Start the backend server:
```bash
# Development mode with nodemon
npm run dev

# Production mode
npm start
```
### 3. Set up the frontend
```bash
cd ../frontend
npm install
```
#### Create a .env file in the /frontend directory:
```env
VITE_API_URL=http://localhost:5000/api
VITE_MAPBOX_API_KEY=your_mapbox_token
```
#### Start the frontend development server:
```bash
npm run dev
```

### 📱 Usage
- 🔍 Search Location: Start typing in the search bar for autocomplete suggestions
- 📌 Select Location: Click a suggestion to view it on the map
- 🧭 View Route: Directions shown from your current location
- 🧾 Search History: View or delete recent searches from the drawer
- 📱 Mobile Friendly: Works smoothly on mobile devices

### 📄 License
This project is licensed under the MIT License.

### 🧑‍💻 Developer
Abbas Akbar – Full Stack Developer
MIT, Dr. A.P.J. Abdul Kalam Technical University
- GitHub: https://github.com/AbbasAkbar1221
- LinkedIn: https://www.linkedin.com/in/abbas-akbar/






