<div align="center">

# 🏔️ HimShakti AI Product Description Generator

### *Empowering Himalayan food brands with AI-generated e-commerce content*

[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com/atlas)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](./LICENSE)
[![Status](https://img.shields.io/badge/Status-In_Progress_(Week_5)-f4a261?style=for-the-badge)](#)

> 🚧 **Project Status:** Under active development — Week 5 of 10 completed.

</div>

---

## 📌 Table of Contents

- [Short Description](#-short-description)
- [Problem Statement](#-problem-statement)
- [Project Objective](#-project-objective)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Database Design](#-database-design)
- [Folder Structure](#-folder-structure)
- [Installation & Setup](#-installation--setup)
- [How to Run Backend Locally](#-how-to-run-backend-locally)
- [API Endpoints](#-api-endpoints)
- [Screenshots](#-screenshots)
- [Progress Tracker](#-progress-tracker)
- [Future Scope](#-future-scope)
- [Author](#-author)
- [License](#-license)

---

## 📖 Short Description

**HimShakti AI Product Description Generator** is a full-stack React + Node.js web application built for the **HimShakti Food Processing Unit** — a Himalayan food brand producing millet snacks, juices, pickles, jams, and chutneys.

The app lets users enter product details and instantly generate platform-optimised product descriptions ready to publish on Amazon, Flipkart, Meesho, Instagram, WhatsApp, and D2C websites. All generated listings are saved to a **MongoDB Atlas** cloud database.

---

## ❗ Problem Statement

> **Writing high-quality, platform-specific product descriptions is time-consuming and requires marketing expertise that most small Himalayan food businesses don't have.**

Without well-written listings, even excellent products get poor visibility on e-commerce platforms.

---

## 🎯 Project Objective

- Accept product details through a validated form interface
- Generate professional descriptions in multiple tones (Premium / Traditional / Health-focused)
- Save all listings to a persistent MongoDB cloud database
- Display and manage saved listings from the Saved page
- Provide a dashboard with usage statistics (Week 6)
- Integrate real AI API for live generation (Week 7)

---

## ✨ Key Features

| Feature | Status |
|---|---|
| 🧾 Product Input Form with validation | ✅ Week 2 |
| 🎨 Tone & Platform Selector | ✅ Week 2 |
| ⚡ AI Description Generator (mock) | ✅ Week 3 |
| 🛒 E-commerce Preview Card | ✅ Week 3 |
| 💾 Save Listings to MongoDB | ✅ Week 5 |
| 🔍 Search Saved Listings | ✅ Week 5 |
| 🗑️ Delete Listings | ✅ Week 5 |
| 📄 Pagination | ✅ Week 5 |
| 🌙 Dark / Light Mode Toggle | ✅ Week 3 |
| 📱 Fully Responsive | ✅ Week 2 |

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React.js 18 + Vite | UI framework and build tool |
| React Router v6 | Client-side routing |
| Axios | HTTP requests to backend |
| Custom CSS + Tailwind | Styling and design tokens |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express.js | REST API server |
| Mongoose | MongoDB ODM — schemas and validation |
| MongoDB Atlas | Cloud database (M0 free tier) |
| dotenv, cors, nodemon | Environment config and dev tools |

---

## 🗄️ Database Design

### Why MongoDB?
- **Schema flexibility** — product listings have variable fields that fit naturally into documents
- **Free cloud tier** — MongoDB Atlas M0 provides 512MB free storage
- **Mongoose integration** — clean schema definition with validation
- **Industry relevance** — widely used in full-stack development

### Schema Diagram

> 📌 *See `docs/database_schema.md` for full field reference, or `W5_SchemaDiagram_[InternID].png` for the visual diagram.*

```
┌─────────────────────────────┐         ┌──────────────────────────────────┐
│         products            │         │     generateddescriptions        │
├─────────────────────────────┤         ├──────────────────────────────────┤
│ _id          ObjectId (PK)  │◄────────│ _id          ObjectId (PK)       │
│ productName  String         │  1 : N  │ productId    ObjectId (FK)       │
│ ingredients  String         │         │ title        String              │
│ weight       String         │         │ shortDesc    String              │
│ category     String         │         │ longDesc     String              │
│ features     [String]       │         │ bulletPoints [String]            │
│ platforms    [String]       │         │ seoKeywords  [String]            │
│ tone         String (enum)  │         │ usageSuggestion String          │
│ keywords     [String]       │         │ platform     String              │
│ createdAt    Date           │         │ tone         String              │
│ updatedAt    Date           │         │ createdAt    Date                │
└─────────────────────────────┘         └──────────────────────────────────┘
```

**Relationship:** One product → many generated descriptions (one-to-many)

---

## 📁 Folder Structure

```
himshakti-ai-generator/
├── client/                         # React frontend
│   ├── src/
│   │   ├── components/             # Reusable UI components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Button.jsx
│   │   │   ├── InputField.jsx
│   │   │   ├── SelectField.jsx
│   │   │   ├── SectionCard.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Toast.jsx
│   │   │   ├── Loader.jsx
│   │   │   ├── ThemeToggle.jsx
│   │   │   ├── ProductForm.jsx
│   │   │   ├── ToneSelector.jsx
│   │   │   ├── PlatformSelector.jsx
│   │   │   ├── OutputEditor.jsx
│   │   │   └── PreviewCard.jsx
│   │   ├── context/
│   │   │   └── ThemeContext.jsx
│   │   ├── hooks/
│   │   │   └── useLocalStorage.js
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Generator.jsx
│   │   │   ├── Saved.jsx           ← fetches from MongoDB
│   │   │   ├── About.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── styles/
│   │   │   └── tokens.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   └── package.json
│
├── server/                         # Express backend
│   ├── models/
│   │   ├── Product.js              ← Mongoose schema (Week 5)
│   │   └── GeneratedDescription.js ← Mongoose schema (Week 5)
│   ├── routes/
│   │   ├── generate.js             ← saves to MongoDB
│   │   └── products.js             ← MongoDB CRUD + pagination
│   ├── server.js                   ← MongoDB connection
│   ├── .env                        ← gitignored
│   ├── .env.example
│   └── package.json
│
├── docs/
│   ├── api_reference.md
│   └── database_schema.md
│
├── .gitignore
└── README.md
```

---

## ⚙️ Installation & Setup

> **Prerequisites:** Node.js v18+, Git, a MongoDB Atlas account (free)

### Step 1 — Clone the Repository
```bash
git clone https://github.com/your-username/himshakti-ai-generator.git
cd himshakti-ai-generator
```

### Step 2 — Install Frontend Dependencies
```bash
cd client
npm install
```

### Step 3 — Install Backend Dependencies
```bash
cd ../server
npm install
```

### Step 4 — Set Up Environment Variables

Create `client/.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

Create `server/.env`:
```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/himshakti?appName=Cluster0
```

---

## 🖥️ How to Run Backend Locally

### Set Up the Database

1. Create a free account at [cloud.mongodb.com](https://cloud.mongodb.com)
2. Create a free M0 cluster
3. Go to **Database Access** → Add a database user with a password
4. Go to **Network Access** → Add `0.0.0.0/0` (allow from anywhere)
5. Click **Connect** → **Drivers** → Copy the connection string
6. Add your database name (`himshakti`) and paste into `server/.env`

### Start the Backend
```bash
cd server
npm run dev
```

Expected output:
```
🚀 HimShakti backend running on http://localhost:5000
✅ MongoDB connected: cluster0.ufnduni.mongodb.net
```

### Verify Connection
```
GET http://localhost:5000/api/health
```
Expected:
```json
{ "status": "ok", "database": "connected" }
```

---

## 📡 API Endpoints

| Method | Endpoint | Description | Status Code |
|---|---|---|---|
| GET | `/api/health` | Health check + DB status | 200 |
| POST | `/api/generate` | Generate + save description | 200 / 400 |
| GET | `/api/products` | List all (paginated) | 200 |
| GET | `/api/products/search?q=` | Search by name/category | 200 / 400 |
| GET | `/api/products/:id` | Get single product | 200 / 404 |
| POST | `/api/products` | Save new product | 201 / 400 |
| PUT | `/api/products/:id` | Update product | 200 / 404 |
| DELETE | `/api/products/:id` | Delete product | 200 / 404 |

Full documentation: `docs/api_reference.md`

---

## 📸 Screenshots

> 📌 *Screenshots will be updated as the project progresses.*

| Screen | Description |
|---|---|
| Generator Page | Two-column layout with form and AI output |
| Saved Listings | Cards showing MongoDB data with search and delete |
| Dark Mode | Full dark theme across all pages |
| Mobile View | Responsive layout at 375px |

---

## 📅 Progress Tracker

| Week | Focus | Status |
|---|---|---|
| Week 1 | Project setup, Vite scaffold, GitHub | ✅ Complete |
| Week 2 | Frontend skeleton, components, routing | ✅ Complete |
| Week 3 | Component library, dark mode, OutputEditor, PreviewCard | ✅ Complete |
| Week 4 | Express backend, 8 REST API endpoints, Axios | ✅ Complete |
| Week 5 | MongoDB Atlas, Mongoose schemas, CRUD, Saved page | ✅ Complete |
| Week 6 | Dashboard — stats, charts, history | 🔲 Upcoming |
| Week 7 | Real AI integration (OpenAI/Gemini) | 🔲 Upcoming |
| Week 8 | Platform-specific formatting + JWT Auth | 🔲 Upcoming |
| Week 9 | Testing, bug fixes, performance | 🔲 Upcoming |
| Week 10 | Deployment (Vercel + Railway), submission | 🔲 Upcoming |

---

## 🚀 Future Scope

- **🤖 Real AI Integration** — OpenAI GPT-4 or Google Gemini for live generation (Week 7)
- **🔐 JWT Authentication** — Login/Register with secure sessions (Week 8)
- **📊 Analytics Dashboard** — Charts showing platform usage and generation stats (Week 6)
- **🌐 Multi-language Output** — Descriptions in Hindi and regional languages
- **📤 Export Options** — Download as PDF, Word, or CSV
- **☁️ Deployment** — Vercel (frontend) + Railway (backend) (Week 10)

---

## 👨‍💻 Author

| Field | Details |
|---|---|
| **Name** | Chandra Pratap Singh |
| **Role** | Intern |
| **Project** | AI Product Description Generator |
| **Organisation** | HimShakti Food Processing Unit |
| **GitHub** | [github.com/your-username](https://github.com/your-username) |
| **LinkedIn** | [linkedin.com/in/your-profile](https://linkedin.com/in/your-profile) |

> Built as part of a 10-week AI-Assisted Full Stack Web Development internship at TBI-GEU.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](./LICENSE) file for details.

---

<div align="center">

Made with ❤️ for the Himalayas &nbsp;|&nbsp; HimShakti Food Processing Unit &nbsp;|&nbsp; 2026

</div>
