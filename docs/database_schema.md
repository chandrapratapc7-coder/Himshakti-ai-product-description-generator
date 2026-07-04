# HimShakti — Database Schema Documentation

Database: MongoDB Atlas (Free Tier M0)
ORM: Mongoose v8.x
Database Name: `himshakti`

---

## Collections

### 1. `products`

Stores all submitted product details from the Generator form.

| Field | Type | Required | Validation | Description |
|---|---|---|---|---|
| `_id` | ObjectId | Auto | — | MongoDB auto-generated ID |
| `productName` | String | ✅ | min 3 chars | Name of the product |
| `ingredients` | String | ✅ | — | Comma-separated ingredients |
| `weight` | String | ✅ | — | Weight or quantity (e.g. "200g") |
| `category` | String | ✅ | — | Product category |
| `features` | [String] | ❌ | — | Array of key features |
| `platform` | String | ❌ | — | Primary platform |
| `platforms` | [String] | ❌ | — | All selected platforms |
| `tone` | String | ❌ | enum | Premium / Traditional / Health-focused |
| `keywords` | [String] | ❌ | — | SEO keywords array |
| `createdAt` | Date | Auto | — | Mongoose timestamps |
| `updatedAt` | Date | Auto | — | Mongoose timestamps |

**Indexes:**
- Text index on `productName`, `category`, `tone` for search

---

### 2. `generateddescriptions`

Stores the AI-generated output, linked to a product via `productId`.

| Field | Type | Required | Validation | Description |
|---|---|---|---|---|
| `_id` | ObjectId | Auto | — | MongoDB auto-generated ID |
| `productId` | ObjectId | ✅ | ref: Product | Foreign key to products collection |
| `title` | String | ✅ | — | Generated product title |
| `shortDesc` | String | ✅ | — | Short description (50-80 words) |
| `longDesc` | String | ✅ | — | Long description (150-250 words) |
| `bulletPoints` | [String] | ❌ | — | 5 bullet point features |
| `seoKeywords` | [String] | ❌ | — | 8-12 SEO keywords |
| `usageSuggestion` | String | ❌ | — | Storage/usage instructions |
| `platform` | String | ❌ | — | Target platform |
| `tone` | String | ❌ | enum | Writing tone used |
| `createdAt` | Date | Auto | — | Mongoose timestamps |
| `updatedAt` | Date | Auto | — | Mongoose timestamps |

---

### 3. `users` (Planned — Week 8)

| Field | Type | Required | Description |
|---|---|---|---|
| `_id` | ObjectId | Auto | MongoDB auto-generated ID |
| `name` | String | ✅ | Full name |
| `email` | String | ✅ | Unique email address |
| `passwordHash` | String | ✅ | Bcrypt hashed password |
| `role` | String | ❌ | "admin" or "user" |
| `createdAt` | Date | Auto | Mongoose timestamps |

---

## Relationships

```
products (1) ──────────────────── (many) generateddescriptions
              productId (ref)
```

One product can have multiple generated descriptions
(e.g. regenerated with different tones or platforms).

---

## How to Run Locally

```bash
cd server
npm install
# Add MONGODB_URI to server/.env
npm run dev
```

Expected console output when connected:
```
✅ MongoDB connected: cluster0.ufnduni.mongodb.net
🚀 HimShakti backend running on http://localhost:5000
```