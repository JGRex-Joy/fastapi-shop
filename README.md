# FastAPI Shop

REST API интернет-магазина, построенный на FastAPI с PostgreSQL в качестве базы данных.

## Стек технологий

- **FastAPI** — веб-фреймворк
- **SQLAlchemy** — ORM
- **Pydantic** — валидация данных
- **PostgreSQL** — база данных
- **Docker** — контейнеризация
- **Uvicorn** — ASGI-сервер

## Структура проекта

```
├── app/
│   ├── models/          # SQLAlchemy модели (Product, Category)
│   ├── schemas/         # Pydantic схемы
│   ├── repositories/    # Слой работы с БД
│   ├── services/        # Бизнес-логика
│   ├── routes/          # Эндпоинты API
│   ├── config.py        # Конфигурация приложения
│   ├── db.py            # Подключение к БД
│   └── main.py          # Точка входа
├── seed_data.py         # Скрипт заполнения БД тестовыми данными
├── Dockerfile
└── requirements.txt
```

## Запуск

### Через Docker

```bash
docker build -t fastapi-shop .
docker run -p 8000:8000 -e DATABASE_URL=postgresql://user:password@host/db fastapi-shop
```

### Локально

1. Установите зависимости:
```bash
pip install -r requirements.txt
```

2. Создайте файл `.env`:
```env
DATABASE_URL=postgresql://user:password@localhost/fastapi_shop
```

3. Заполните БД тестовыми данными:
```bash
python seed_data.py
```

4. Запустите сервер:
```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

## API

После запуска документация доступна по адресам:
- **Swagger UI**: `http://localhost:8000/api/docs`
- **ReDoc**: `http://localhost:8000/api/redoc`

### Эндпоинты

#### Товары
| Метод | URL | Описание |
|-------|-----|----------|
| `GET` | `/api/products` | Список всех товаров |
| `GET` | `/api/products/{id}` | Товар по ID |
| `GET` | `/api/products/category/{id}` | Товары по категории |

#### Категории
| Метод | URL | Описание |
|-------|-----|----------|
| `GET` | `/api/categories` | Список всех категорий |
| `GET` | `/api/categories/{id}` | Категория по ID |

#### Корзина
Корзина хранится на стороне клиента в виде словаря `{product_id: quantity}` и передаётся в теле запроса.

| Метод | URL | Описание |
|-------|-----|----------|
| `POST` | `/api/cart` | Получить детали корзины |
| `POST` | `/api/cart/add` | Добавить товар в корзину |
| `PUT` | `/api/cart/update` | Обновить количество товара |
| `DELETE` | `/api/cart/remove/{id}` | Удалить товар из корзины |

### Пример: добавить товар в корзину

```bash
curl -X POST http://localhost:8000/api/cart/add \
  -H "Content-Type: application/json" \
  -d '{"product_id": 1, "quantity": 2, "cart": {}}'
```

Ответ:
```json
{
  "cart": {"1": 2}
}
```

### Пример: получить содержимое корзины

```bash
curl -X POST http://localhost:8000/api/cart \
  -H "Content-Type: application/json" \
  -d '{"1": 2, "3": 1}'
```

## Тестовые данные

Скрипт `seed_data.py` создаёт 4 категории и 13 товаров:

- **Electronics** — смарт-часы, мышь, клавиатура, наушники
- **Clothing** — куртка, кроссовки
- **Books** — книги по программированию, дизайну, кулинарии
- **Home & Garden** — горшки, лампа, подушки, садовые инструменты

Скрипт идемпотентен — повторный запуск не создаст дублирующиеся записи.

## Переменные окружения

| Переменная | Описание | Обязательная |
|------------|----------|-------------|
| `DATABASE_URL` | URL подключения к PostgreSQL | Да |