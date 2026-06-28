# How to Run Backend Locally

> Add this section to your existing README.md under Installation.

---

## 🖥️ Backend Setup (Express.js — Week 4)

### Prerequisites
- Node.js v18 or higher
- npm

### Step 1 — Navigate to Server Folder

```bash
cd server
```

### Step 2 — Install Dependencies

```bash
npm install
```

### Step 3 — Create Environment File

```bash
cp .env.example .env
```

The `.env` file should contain:

```env
PORT=5000
```

### Step 4 — Start the Backend Server

```bash
npm run dev
```

The server starts at:
```
http://localhost:5000
```

### Step 5 — Verify It's Running

Open your browser or Postman and visit:
```
GET http://localhost:5000/api/health
```

Expected response:
```json
{
  "status": "ok",
  "message": "HimShakti backend is running"
}
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Health check |
| POST | `/api/generate` | Generate AI description |
| GET | `/api/products` | Get all saved products |
| GET | `/api/products/search?q=` | Search products |
| GET | `/api/products/:id` | Get single product |
| POST | `/api/products` | Save a product |
| PUT | `/api/products/:id` | Update a product |
| DELETE | `/api/products/:id` | Delete a product |

See `docs/api_reference.md` for full request/response details.

---

## 🚀 Running Frontend + Backend Together

Open **two terminals** simultaneously:

**Terminal 1 — Backend:**
```bash
cd server
npm run dev
# Running on http://localhost:5000
```

**Terminal 2 — Frontend:**
```bash
cd client
npm run dev
# Running on http://localhost:5173
```

Then open `http://localhost:5173` in your browser.