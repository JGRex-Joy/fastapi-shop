# FastAPI Shop 🛒

### Frontend is on another branch.

Full-stack e-commerce application built with FastAPI (backend) and Vue.js (frontend). A modern, fast, and scalable online shop with cart functionality, product catalog, and category management.

## 🚀 Features

- **Product Catalog**: Browse products with detailed information, images, and prices
- **Categories**: Organized product categorization (Electronics, Clothing, Books, Home & Garden)
- **Shopping Cart**: Add, update, remove items with real-time calculations
- **RESTful API**: Well-structured backend with FastAPI
- **Responsive UI**: Modern Vue.js frontend
- **Database**: SQLAlchemy ORM with PostgreSQL/SQLite support
- **Auto-documentation**: Interactive API docs with Swagger UI

## 📋 Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - SQL toolkit and ORM
- **Pydantic** - Data validation using Python type annotations
- **Uvicorn** - ASGI server

### Frontend
- **Vue.js 3** - Progressive JavaScript framework
- **Vue Router** - Official routing library
- **Axios** - HTTP client for API requests

## 🛠️ Installation & Setup

### Prerequisites
- Python 3.10+
- Node.js 16+
- PostgreSQL 13+
- Docker & Docker Compose (for containerized deployment)

### Backend Setup

1. **Clone the repository**
```bash
git clone https://github.com/JGRex-Joy/fastapi-shop.git
cd fastapi-shop
```

2. **Create virtual environment**
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. **Install dependencies**
```bash
pip install -r requirements.txt
```

4. **Configure environment**
Create `.env` file in the root directory:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/shop_db
```

5. **Run the application**
```bash
# Seed database and start server
python seed_data.py
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at:
- **API**: http://localhost:8000
- **Swagger Docs**: http://localhost:8000/api/docs
- **ReDoc**: http://localhost:8000/api/redoc

### Frontend Setup

1. **Navigate to frontend directory**
```bash
cd frontend  # Adjust path to your frontend folder
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure API endpoint (if needed)**
The API base URL is configured in `api.js`. By default it points to `http://localhost:8000/api`. 
Update it if your backend runs on a different host/port.

4. **Run development server**
```bash
npm run dev
```

The frontend will be available at http://localhost:5173 (or another port shown in console)

### Docker Deployment

Run the entire stack with Docker Compose:

```bash
docker-compose up --build
```

This will start:
- Backend API on port 8000
- Frontend on port 80 (or configured port)
- PostgreSQL database (if configured)

## 📚 API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/{id}` - Get product by ID
- `GET /api/products/category/{category_id}` - Get products by category

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/{id}` - Get category by ID

### Cart
- `POST /api/cart/add` - Add item to cart
- `POST /api/cart` - Get cart details
- `PUT /api/cart/update` - Update cart item quantity
- `DELETE /api/cart/remove/{product_id}` - Remove item from cart

### Health Check
- `GET /health` - API health status

## 🗂️ Project Structure

```
fastapi-shop/
├── app/
│   ├── models/          # SQLAlchemy models
│   │   ├── category.py
│   │   └── product.py
│   ├── schemas/         # Pydantic schemas
│   │   ├── cart.py
│   │   ├── category.py
│   │   └── product.py
│   ├── repositories/    # Data access layer
│   │   ├── category_repository.py
│   │   └── product_repository.py
│   ├── services/        # Business logic
│   │   ├── cart_service.py
│   │   ├── category_service.py
│   │   └── product_service.py
│   ├── routes/          # API endpoints
│   │   ├── cart.py
│   │   ├── categories.py
│   │   └── products.py
│   ├── config.py        # Configuration
│   ├── db.py           # Database setup
│   └── main.py         # Application entry point
├── frontend/           # Vue.js application
├── seed_data.py       # Database seeding script
├── Dockerfile         # Docker configuration
├── requirements.txt   # Python dependencies
└── README.md
```

## 🎨 Sample Data

The application comes with pre-seeded data including:

**Categories:**
- Electronics (Smart Watch, Mouse, Keyboard, Headphones)
- Clothing (Leather Jacket, Running Shoes)
- Books (Programming Guide, Design, Cooking)
- Home & Garden (Plant Pots, Desk Lamp, Pillows, Garden Tools)

Images are sourced from Unsplash for demonstration purposes.

## 📝 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | Required |
| `DEBUG` | Debug mode | `true` |
| `CORS_ORIGINS` | Allowed CORS origins | `["*"]` |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Amir, IT & Business Vocational School, Bishkek, Kyrgyzstan

## 🙏 Acknowledgments

- Product images from [Unsplash](https://unsplash.com)
- FastAPI documentation and community
- Vue.js community

---

**Happy Shopping! 🛍️**
