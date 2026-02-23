# 🛍️ FastAPI Shop

A RESTful e-commerce backend API built with **FastAPI** and **PostgreSQL**. Features a clean layered architecture with repositories, services, and route handlers — ready to connect to any frontend.

> **Live frontend:** [jgrex-joy.github.io](https://jgrex-joy.github.io)  
> **API docs:** `/api/docs` (Swagger UI) · `/api/redoc` (ReDoc)

---

## ✨ Features

- 📦 **Product catalog** with categories, descriptions, images, and prices
- 🗂️ **Category management** with slug-based identification
- 🛒 **Stateless shopping cart** — cart state lives on the client side, the API handles all business logic (validation, totals, item counts)
- 🔍 **Filter products by category**
- 📄 **Auto-generated API documentation** via Swagger UI and ReDoc
- 🐳 **Docker-ready** with a single command startup
- 🌱 **Database seeder** with sample products and categories

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | [FastAPI](https://fastapi.tiangolo.com/) |
| Database | PostgreSQL |
| ORM | SQLAlchemy |
| Validation | Pydantic v2 |
| Server | Uvicorn (ASGI) |
| Containerization | Docker |

---

## 📁 Project Structure

```
fastapi-shop/
├── app/
│   ├── models/
│   │   ├── category.py          # Category SQLAlchemy model
│   │   └── product.py           # Product SQLAlchemy model
│   ├── schemas/
│   │   ├── category.py          # Category Pydantic schemas
│   │   ├── product.py           # Product Pydantic schemas
│   │   └── cart.py              # Cart Pydantic schemas
│   ├── repositories/
│   │   ├── category_repository.py  # Category DB operations
│   │   └── product_repository.py   # Product DB operations
│   ├── services/
│   │   ├── category_service.py     # Category business logic
│   │   ├── product_service.py      # Product business logic
│   │   └── cart_service.py         # Cart business logic
│   ├── routes/
│   │   ├── categories.py        # Category endpoints
│   │   ├── products.py          # Product endpoints
│   │   └── cart.py              # Cart endpoints
│   ├── config.py                # App configuration (pydantic-settings)
│   ├── db.py                    # DB engine, session, base
│   └── main.py                  # FastAPI app entry point
├── seed_data.py                 # Database seeder script
├── Dockerfile
├── requirements.txt
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Python 3.10+
- PostgreSQL database
- Docker (optional)

### Option 1 — Docker (recommended)

```bash
# Build the image
docker build -t fastapi-shop .

# Run the container
docker run -p 8000:8000 \
  -e DATABASE_URL=postgresql://user:password@host:5432/fastapi_shop \
  fastapi-shop
```

The container will automatically run the database seeder before starting the server.

### Option 2 — Local Development

**1. Clone the repository**

```bash
git clone https://github.com/your-username/fastapi-shop.git
cd fastapi-shop
```

**2. Create and activate a virtual environment**

```bash
python -m venv venv
source venv/bin/activate      # Linux / macOS
venv\Scripts\activate         # Windows
```

**3. Install dependencies**

```bash
pip install -r requirements.txt
```

**4. Configure environment variables**

Create a `.env` file in the project root:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/fastapi_shop
```

**5. Seed the database**

```bash
python seed_data.py
```

**6. Start the development server**

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`.

---

## 📖 API Reference

### Base URL

```
http://localhost:8000/api
```

### Health Check

```
GET /health
```
```json
{ "status": "ok" }
```

---

### 📦 Products

#### Get all products

```
GET /api/products
```

**Response:**
```json
{
  "products": [
    {
      "id": 1,
      "name": "Smart Watch Pro",
      "description": "Advanced smartwatch with fitness tracking...",
      "price": 399.99,
      "category_id": 1,
      "image_url": "https://...",
      "created_at": "2024-01-01T00:00:00",
      "category": {
        "id": 1,
        "name": "Electronics",
        "slug": "electronics"
      }
    }
  ],
  "total": 13
}
```

#### Get product by ID

```
GET /api/products/{product_id}
```

#### Get products by category

```
GET /api/products/category/{category_id}
```

---

### 🗂️ Categories

#### Get all categories

```
GET /api/categories
```

**Response:**
```json
[
  { "id": 1, "name": "Electronics",  "slug": "electronics" },
  { "id": 2, "name": "Clothing",     "slug": "clothing"    },
  { "id": 3, "name": "Books",        "slug": "books"       },
  { "id": 4, "name": "Home & Garden","slug": "home-garden" }
]
```

#### Get category by ID

```
GET /api/categories/{category_id}
```

---

### 🛒 Cart

The cart is **stateless on the server side** — the client stores the cart as a plain dictionary `{ product_id: quantity }` and passes it with every request. The API validates products, calculates totals, and returns the enriched cart.

#### Add item to cart

```
POST /api/cart/add
```

**Request body:**
```json
{
  "product_id": 1,
  "quantity": 2,
  "cart": {}
}
```

**Response:**
```json
{
  "cart": { "1": 2 }
}
```

If the product is already in the cart, the quantity is incremented.

#### Get cart details

```
POST /api/cart
```

**Request body:**
```json
{ "1": 2, "3": 1 }
```

**Response:**
```json
{
  "items": [
    {
      "product_id": 1,
      "name": "Smart Watch Pro",
      "price": 399.99,
      "quantity": 2,
      "subtotal": 799.98,
      "image_url": "https://..."
    },
    {
      "product_id": 3,
      "name": "Wireless Keyboard",
      "price": 79.99,
      "quantity": 1,
      "subtotal": 79.99,
      "image_url": "https://..."
    }
  ],
  "total": 879.97,
  "items_count": 3
}
```

#### Update item quantity

```
PUT /api/cart/update
```

**Request body:**
```json
{
  "product_id": 1,
  "quantity": 5,
  "cart": { "1": 2 }
}
```

**Response:**
```json
{
  "cart": { "1": 5 }
}
```

#### Remove item from cart

```
DELETE /api/cart/remove/{product_id}
```

**Request body:**
```json
{
  "cart": { "1": 2, "3": 1 }
}
```

**Response:**
```json
{
  "cart": { "3": 1 }
}
```

---

### ⚠️ Error Responses

All endpoints return standard HTTP error responses:

```json
{
  "detail": "Product with id 99 not found"
}
```

| Status Code | Meaning |
|-------------|---------|
| `400 Bad Request` | Invalid input (e.g. category does not exist) |
| `404 Not Found` | Product or category does not exist |
| `422 Unprocessable Entity` | Request body validation failed |

---

## 🌱 Seed Data

The `seed_data.py` script populates the database with sample categories and products. It is **idempotent** — running it multiple times will not create duplicate records.

**Categories and products created:**

| Category | Products |
|----------|----------|
| Electronics | Smart Watch Pro, Wireless Mouse, Wireless Keyboard, Wireless Headphones |
| Clothing | Leather Biker Jacket, Running Shoes |
| Books | Python Programming Guide, The Art of Design, Cooking Masterclass |
| Home & Garden | Plant Pot Set, LED Desk Lamp, Throw Pillow Set, Garden Tool Kit |

Run manually with:
```bash
python seed_data.py
```

---

## ⚙️ Configuration

All configuration is managed via environment variables or a `.env` file using `pydantic-settings`.

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `DATABASE_URL` | PostgreSQL connection string | ✅ Yes | — |
| `APP_NAME` | Application name | No | `FastAPI Shop` |
| `DEBUG` | Enable debug mode | No | `true` |

**Example `DATABASE_URL` formats:**
```
postgresql://user:password@localhost:5432/fastapi_shop
postgresql://user:password@db-host:5432/fastapi_shop
```

---

## 🏛️ Architecture

The project follows a **three-layer architecture**:

```
Routes  →  Services  →  Repositories  →  Database
```

- **Routes** handle HTTP request/response and delegate to services. Input is validated automatically via Pydantic schemas.
- **Services** contain all business logic — checking that products exist, calculating cart totals, handling 404s and 400s.
- **Repositories** are the only layer that talks to the database through SQLAlchemy. They never raise HTTP exceptions.

This separation keeps each layer focused and makes the code straightforward to test, extend, and maintain independently.

---

## 🔒 CORS

The API is configured to accept requests from `https://jgrex-joy.github.io`. To allow additional origins, update the `allow_origins` list in `app/main.py`:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://jgrex-joy.github.io", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## 📜 License

This project is open source and available under the [MIT License](LICENSE).