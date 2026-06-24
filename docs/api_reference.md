# HimShakti Backend — API Reference

Base URL (local development): `http://localhost:5000/api`

All request and response bodies are JSON. Set the header
`Content-Type: application/json` on all POST requests.

---

## Health Check

### `GET /api/health`

Verifies that the server is running.

**Response — 200 OK**
```json
{
  "status": "ok",
  "message": "HimShakti backend is running",
  "timestamp": "2026-06-15T10:00:00.000Z"
}
```

---

## Generate Description

### `POST /api/generate`

Generates an AI product description based on the submitted product details.
Currently returns a **mock response** — will call OpenAI/Gemini in Week 7.

**Request Body**
| Field | Type | Required | Description |
|---|---|---|---|
| `productName` | string | ✅ | Name of the product |
| `ingredients` | string | ✅ | Comma-separated list of ingredients |
| `weight` | string | ✅ | Weight or quantity (e.g. `"200g"`) |
| `category` | string | ✅ | Product category (e.g. `"Snacks"`) |
| `features` | string | ❌ | Key features / selling points |
| `platform` | string | ❌ | Target platform (e.g. `"Amazon"`) |
| `tone` | string | ❌ | Writing tone — `"Premium"`, `"Traditional"`, or `"Health-focused"` |
| `keywords` | string | ❌ | Comma-separated extra SEO keywords |

**Example Request**
```json
{
  "productName": "Mandua Cookies",
  "ingredients": "finger millet, jaggery, ghee, cardamom",
  "weight": "200g",
  "category": "Snacks",
  "features": "No maida, no refined sugar, high fibre",
  "platform": "Amazon",
  "tone": "Health-focused",
  "keywords": "millet cookies, gluten-free"
}
```

**Response — 200 OK**
```json
{
  "title": "Mandua Cookies | Snacks | 200g",
  "shortDescription": "A health-focused snacks crafted from finger millet. Perfect for customers seeking authentic Himalayan flavours.",
  "longDescription": "Introducing Mandua Cookies — a health-focused offering from the heart of Uttarakhand. Made with finger millet, jaggery, ghee, cardamom, this product embodies the rich culinary heritage of the Himalayas. No maida, no refined sugar, high fibre Ideal for all age groups and available on Amazon.",
  "bulletPoints": [
    "Made with finger millet sourced from Himalayan farms",
    "No maida, no refined sugar, high fibre",
    "No artificial preservatives or colours",
    "Traditional Pahadi recipe — authentic mountain taste",
    "Suitable for health-conscious snackers and families"
  ],
  "keywords": [
    "mandua cookies",
    "Himalayan food",
    "Uttarakhand products",
    "natural ingredients",
    "Pahadi food",
    "millet cookies",
    "gluten-free"
  ],
  "usage": "Store in a cool, dry place away from direct sunlight. Best consumed within 30 days of opening. Reseal the pack after each use to retain freshness."
}
```

**Response — 400 Bad Request** (missing required fields)
```json
{
  "error": "Missing required fields",
  "missingFields": ["productName", "category"]
}
```

---

## Products (Saved Listings)

### `POST /api/products`

Saves a generated product listing.

**Request Body**
Any JSON object containing at least `productName`. Typically the full
form data + generated output.

```json
{
  "productName": "Mandua Cookies",
  "category": "Snacks",
  "weight": "200g",
  "tone": "Health-focused",
  "platforms": ["Amazon", "Flipkart"],
  "output": { "title": "...", "shortDescription": "..." }
}
```

**Response — 201 Created**
```json
{
  "id": "1718443200000",
  "createdAt": "2026-06-15T10:00:00.000Z",
  "productName": "Mandua Cookies",
  "category": "Snacks",
  "weight": "200g",
  "tone": "Health-focused",
  "platforms": ["Amazon", "Flipkart"],
  "output": { "title": "...", "shortDescription": "..." }
}
```

**Response — 400 Bad Request**
```json
{ "error": "productName is required" }
```

---

### `GET /api/products`

Returns all saved products, newest first.

**Response — 200 OK**
```json
[
  {
    "id": "1718443200000",
    "createdAt": "2026-06-15T10:00:00.000Z",
    "productName": "Mandua Cookies",
    "category": "Snacks",
    "weight": "200g"
  }
]
```

---

### `GET /api/products/:id`

Returns a single saved product by ID.

**Response — 200 OK** — single product object (same shape as above)

**Response — 404 Not Found**
```json
{ "error": "Product not found" }
```

---

### `DELETE /api/products/:id`

Deletes a saved product by ID.

**Response — 200 OK**
```json
{ "message": "Deleted successfully", "id": "1718443200000" }
```

**Response — 404 Not Found**
```json
{ "error": "Product not found" }
```

---

## Error Responses

| Status | Meaning | Example |
|---|---|---|
| `400` | Bad Request — missing/invalid fields | `{ "error": "Missing required fields", "missingFields": [...] }` |
| `404` | Not Found — route or resource doesn't exist | `{ "error": "Product not found" }` |
| `500` | Internal Server Error | `{ "error": "Internal server error" }` |

---

## Notes

- Data is currently stored **in-memory** — restarting the server clears all saved products. MongoDB integration is planned for Week 5.
- `/api/generate` currently returns **mock content**. Real AI integration (OpenAI/Gemini) is planned for Week 7.
- CORS is enabled for all origins during development.
