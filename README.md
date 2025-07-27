# 🚦 Switchline

Switchline is a full-stack project consisting of a React frontend and a Django REST API backend with a PostgreSQL database.
## 🗂 Project Structure

```
switchline/
├── frontend/      # React SPA using Vite
├── api/           # Django project and apps
└── README.md
└── Makefile       # Makefile to generate typescript types
```

## 🧰 Prerequisites

Make sure you have the following installed:
- Python 3.10+
- Node.js 24+
- PostgreSQL (running locally or via Docker)
- `uv` (for Python dependency management)

## ⚙️ Backend Setup (Django)

- Navigate to the API directory:

```
cd switchline/api
```

- Install Python dependencies:

```
uv sync
```

- Set up environment variables:

This project doesn't have `.env` support at this time, instead, you'll need
to `export the following env vars:

```
RAILWAY_API_TOKEN=
OPENAI_API_KEY=
```

- Set up PostgreSQL database

Make sure PostgreSQL is running locally. Then create the database using:

```
python manage.py sqlcreate | psql
```


- Run migrations and seed initial data:

```
python manage.py migrate
python manage.py createsuperuser  # optional
```

- Start the Django development server:

```
python manage.py runserver
```

Your API will be live at http://127.0.0.1:8000/.

## 🌐 Frontend Setup (React + Vite)

- Navigate to the frontend directory:

```
cd switchline/frontend
```

- Install JavaScript dependencies:

```
yarn
```

- Start the development server:

```
yarn dev
```

Your app will be live at http://localhost:5173/.

## 🧪 Running Tests

There aren't tests for this project at this time.

## 🔗 API & Frontend Communication

If you make changes to the API, these changes are propagated to the frontend
using these two packages:

- [`openapi-typescript`](https://openapi-ts.dev/introduction)
- [`openapi-fetch`](https://openapi-ts.dev/openapi-fetch/)

This gives you Typescript types for all request and response payload types, as
well as a type-safe API layer that validates url paths and params, query
strings, post bodies, and more when building the application by running `yarn
build`.

✅ You're Ready!

- Frontend: http://localhost:5173
- Backend: http://127.0.0.1:8000

