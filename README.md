

# 🏔️ HimShakti AI Product Description Generator

### *Empowering Himalayan food brands with AI-generated e-commerce content*

[React](https://reactjs.org/) [Vite](https://vitejs.dev/) [TailwindCSS](https://tailwindcss.com/) [License](./LICENSE) [Status](#)

> 🚧 **Project Status:** Under active development — Week 2 of 10 completed.



---

## 📌 Table of Contents

- [Short Description](#-short-description)
- [Problem Statement](#-problem-statement)
- [Project Objective](#-project-objective)
- [Key Features](#-key-features-built-so-far)
- [Tech Stack](#-tech-stack)
- [Folder Structure](#-folder-structure)
- [Installation & Setup](#-installation--setup)
- [Commands to Run](#-commands-to-run)
- [Screenshots](#-screenshots)
- [Progress Tracker](#-progress-tracker)
- [Future Scope](#-future-scope)
- [Author](#-author)
- [License](#-license)

---

## 📖 Short Description

**HimShakti AI Product Description Generator** is a React-based web application built for the **HimShakti Food Processing Unit** — a Himalayan food brand producing millet snacks, juices, pickles, jams, and chutneys.

The app lets users enter product details such as product name, ingredients, category, weight, and features — then generates clean, platform-optimised product descriptions suitable for Amazon, Flipkart, Meesho, Instagram, WhatsApp, and D2C websites.

---

## ❗ Problem Statement

Small and mid-scale Himalayan food producers like HimShakti face a major challenge:

> **Writing high-quality, platform-specific product descriptions is time-consuming, expensive, and requires marketing expertise that most small businesses don't have.**

Without well-written listings, even excellent products get poor visibility on e-commerce platforms. Manually writing separate content for Amazon, Flipkart, and Instagram for every product SKU wastes hours of effort and produces inconsistent results.

---

## 🎯 Project Objective

The goal of this project is to build a simple, fast, and beginner-friendly AI-powered tool that:

- Accepts product details through a clean, validated form interface
- Generates professional product descriptions in multiple tones *(Premium / Traditional / Health-focused)*
- Produces content ready to publish on multiple e-commerce platforms
- Saves generated listings locally for future reference
- Can be used by non-technical staff at HimShakti with zero training

---

## ✨ Key Features *(Built So Far)*


| Feature                   | Status   | Description                                               |
| ------------------------- | -------- | --------------------------------------------------------- |
| 📋 **Product Input Form** | ✅ Week 2 | Name, ingredients, category, weight, features, keywords   |
| 🎨 **Tone Selector**      | ✅ Week 2 | Premium, Traditional, Health-focused writing styles       |
| 📱 **Platform Selector**  | ✅ Week 2 | Amazon, Flipkart, Meesho, Instagram, WhatsApp, D2C        |
| ✅ **Form Validation**     | ✅ Week 2 | Inline red error messages on all required fields          |
| 🧭 **Navbar**             | ✅ Week 2 | Sticky top bar with branding + mobile hamburger menu      |
| 📐 **Responsive Layout**  | ✅ Week 2 | Works on mobile (375px), tablet (768px), desktop (1280px) |
| ⚡ **Mock AI Output**      | ✅ Week 2 | Simulated output panel with title, description, bullets   |


---

## 🛠️ Tech Stack

### Frontend *(Current)*


| Technology                               | Version | Purpose                     |
| ---------------------------------------- | ------- | --------------------------- |
| [React.js](https://reactjs.org/)         | 18.x    | UI component library        |
| [Vite](https://vitejs.dev/)              | 5.x     | Fast development build tool |
| [Tailwind CSS](https://tailwindcss.com/) | 3.x     | Utility-first CSS styling   |


### Planned (Upcoming Weeks)


| Technology           | Purpose                      |
| -------------------- | ---------------------------- |
| React Router         | Client-side page navigation  |
| Axios                | HTTP requests to backend API |
| Node.js + Express.js | REST API server              |
| MongoDB + Mongoose   | Persistent cloud database    |
| OpenAI / Gemini API  | Real AI content generation   |
| JWT Auth             | Login and Register system    |


### Tools


| Tool         | Purpose         |
| ------------ | --------------- |
| Git & GitHub | Version control |
| VS Code      | Code editor     |


---

## 📁 Folder Structure

```
himshakti-ai-generator/
│
└── client/                         # React frontend (Vite)
    ├── public/
    │   └── favicon.ico
    ├── src/
    │   ├── components/             # Reusable UI components
    │   │   ├── Navbar.jsx          ✅ Built — Week 2
    │   │   ├── ProductForm.jsx     ✅ Built — Week 2
    │   │   ├── ToneSelector.jsx    ✅ Built — Week 2
    │   │   └── PlatformSelector.jsx ✅ Built — Week 2
    │   │
    │   ├── pages/                  # Full-page views
    │   │   └── Generator.jsx       ✅ Built — Week 2
    │   │
    │   ├── hooks/                  # Custom React hooks (Week 5)
    │   ├── services/               # API call functions (Week 7)
    │   ├── utils/                  # Helper utilities
    │   └── data/                   # Static dropdown data
    │
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    └── package.json
```

---

## ⚙️ Installation & Setup

> **Prerequisites:** Make sure you have these installed:
>
> - [Node.js](https://nodejs.org/) v18 or higher — check with `node -v`
> - [Git](https://git-scm.com/) — check with `git --version`
> - [VS Code](https://code.visualstudio.com/) *(recommended editor)*

### Step 1 — Clone the Repository

```bash
git clone https://github.com/your-username/himshakti-ai-generator.git
cd himshakti-ai-generator
```

### Step 2 — Go into the Client Folder

```bash
cd client
```

### Step 3 — Install Dependencies

```bash
npm install
```

That's it! No `.env` file or backend setup needed at this stage.

---

## ▶️ Commands to Run

### Start the Development Server

```bash
cd client
npm run dev
```

Open your browser and visit:

```
http://localhost:5173
```

### Build for Production

```bash
npm run build
```

### Preview the Production Build

```bash
npm run preview
```

---

## 📸 Screenshots

> 📌 *Screenshots will be added after UI polish in Week 3.*


| Screen         | Description                                                    |
| -------------- | -------------------------------------------------------------- |
| Generator Page | Two-column layout — input form (left) and output panel (right) |
| Mobile View    | Stacked single-column layout on 375px screen                   |
| Tone Selector  | Three card-style tone options                                  |
| Platform Pills | Multi-select platform buttons with colour indicators           |


---

## 📅 Progress Tracker


| Week    | Focus                                                                      | Status         |
| ------- | -------------------------------------------------------------------------- | -------------- |
| Week 1  | Project setup, Vite scaffold, folder structure, GitHub                     | ✅ Complete     |
| Week 2  | ProductForm, ToneSelector, PlatformSelector, Validation, Responsive layout | ✅ Complete     |
| Week 3  | Reusable components, OutputEditor, PreviewCard, Branding                   | 🔄 In Progress |
| Week 4  | React Router, navigation, Saved listings page                              | 🔲 Upcoming    |
| Week 5  | LocalStorage — save, view, delete listings                                 | 🔲 Upcoming    |
| Week 6  | Dashboard — stats and generation history                                   | 🔲 Upcoming    |
| Week 7  | Real AI API integration (OpenAI / Gemini)                                  | 🔲 Upcoming    |
| Week 8  | Platform-specific output formatting                                        | 🔲 Upcoming    |
| Week 9  | Testing, bug fixes, performance optimisation                               | 🔲 Upcoming    |
| Week 10 | Final polish, deployment, submission                                       | 🔲 Upcoming    |


---

## 🚀 Future Scope

Features planned for upcoming weeks and versions:

- **🤖 Real AI Integration** — Connect to OpenAI GPT-4 or Google Gemini for actual generation
- **🗄️ MongoDB Database** — Replace LocalStorage with persistent cloud storage
- **🔐 User Authentication** — Login and Register with JWT-based sessions
- **📤 Export Options** — Download content as PDF, Word, or CSV
- **📊 Analytics Dashboard** — Charts showing generation history and usage stats
- **🌐 Multi-language Output** — Descriptions in Hindi and regional languages
- **🛒 Direct Platform Publish** — Push listings to Amazon Seller Central or Flipkart
- **📱 Mobile App** — React Native version for field use by HimShakti staff

---

## 👨‍💻 Author


| Field            | Details                                                              |
| ---------------- | -------------------------------------------------------------------- |
| **Name**         | Chandra Pratap Singh                                                 |
| **Role**         | Intern                                                               |
| **Project**      | AI Product Description Generator                                     |
| **Organisation** | HimShakti Food Processing Unit                                       |
| **GitHub**       | [github.com/your-username](https://github.com/your-username)         |
| **LinkedIn**     | [linkedin.com/in/your-profile](https://linkedin.com/in/your-profile) |


> This project was built as part of an internship programme to apply React.js and AI integration skills in a real-world business context for a Himalayan food brand.

---

## 📄 License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2025 Chandra Pratap Singh

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```

---



Made with ❤️ for the Himalayas  |  HimShakti Food Processing Unit  |  2025

⭐ *If this project helped you, consider giving it a star on GitHub!*

