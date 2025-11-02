# 📝 MERN Todo Application

A full-stack **MERN (MongoDB, Express, React, Node.js)** application for managing notes/todos with cloud-hosted persistence using **MongoDB Atlas** and **Upstash Redis**.  
This project demonstrates a production-ready containerized setup using **Docker** and **Docker Compose**.

---

## 🚀 Features

- Create, edit, and delete notes.
- Persistent data storage using **MongoDB Atlas**.
- **Upstash Redis** integration for backend caching.
- Separate **frontend** and **backend** Dockerfiles for modular builds.
- Environment-based configuration for flexibility (local or containerized).
- Ready-to-run setup with `docker-compose`.

---

## ⚙️ Prerequisites

Before running the project, make sure you have the following installed:

- [Node.js](https://nodejs.org/en/download) (v18+)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- A [MongoDB Atlas](https://www.mongodb.com/atlas) cluster
- An [Upstash Redis](https://upstash.com/) database

---

## 🛠️ Setup Instructions

### 1. Create a MongoDB Atlas Cluster

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas/database).
2. Create a **free cluster**.
3. Create a **database** and **collection**.
4. Under **Database Access**, create a user and password.
5. Under **Network Access**, allow access from `0.0.0.0/0`.
6. Copy your **connection string**, e.g.:
   ```
   mongodb+srv://<username>:<password>@cluster0.mongodb.net/mern-todo
   ```

---

### 2. Create an Upstash Redis Database

1. Visit [Upstash Redis](https://upstash.com/redis).
2. Create a new Redis database.
3. Copy the **REST URL** and **token**.
4. You’ll use this URL in the backend `.env` file as `REDIS_URL`.

---

### 3. Backend Environment Configuration

Create a file named `.env` inside the `backend/` folder:

```bash
PORT=5000
MONGODB_URI=<your_mongodb_atlas_connection_string>
REDIS_URL=<your_upstash_redis_url>
JWT_SECRET=<your_jwt_secret>
```

> ⚠️ Do **not** commit this file to GitHub.

---

### 4. Local Development (without Docker)

**Backend:**
```bash
cd backend
npm install
npm run dev
```

**Frontend:**
```bash
cd frontend
npm install
npm start
```

Then visit 👉 **http://localhost:3000**

---

## 🐳 Docker Setup

This project includes a ready-to-use `docker-compose.yml` file for running both services.

### 🧱 Docker Compose Configuration
```yaml
version: "3.9"

services:
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: backend          # 👈 Match NGINX proxy_pass hostname
    restart: unless-stopped
    env_file:
      - ./backend/.env
    environment:
      - NODE_ENV=production
      - PORT=5001                    # 👈 Must match NGINX proxy_pass port
    expose:
      - "5001"
    networks:
      - mern-net

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    container_name: mern-todo-frontend
    restart: unless-stopped
    ports:
      - "80:80"
    depends_on:
      - backend
    networks:
      - mern-net

networks:
  mern-net:
    driver: bridge

```

### ▶️ Run with Docker Compose

```bash
docker-compose up --build
```

Access your app at:  
👉 **Frontend:** http://localhost:3000  
👉 **Backend API:** http://localhost:5000/api

---

## 🧪 Environment Variable Reference

| Variable | Description | Location |
|-----------|-------------|-----------|
| `PORT` | Port for backend server | backend/.env |
| `MONGODB_URI` | MongoDB Atlas connection string | backend/.env |
| `UPSTASH_REDIS_REST_URL` | Upstash Redis connection URL | backend/.env |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash Redis Token | backend/.env |

---

## 📦 Deployment Notes

- Since MongoDB Atlas and Upstash Redis are **cloud-based**, no database volume is required in Docker.
- If you host on a cloud service (e.g., AWS, Render, or Azure), ensure:
  - Backend has access to MongoDB Atlas and Upstash URLs.
  - Frontend points to the correct backend API domain.

---

## 🧰 Tech Stack

- **Frontend:** React, Axios, TailwindCSS, React Router
- **Backend:** Node.js, Express.js, Mongoose
- **Database:** MongoDB Atlas
- **Cache:** Upstash Redis
- **Containerization:** Docker & Docker Compose

---

## 🧑‍💻 Author

**Kushal Aswani**  
DevOps & Cloud Security Engineer  
🔗 [GitHub](https://github.com/kushal-aswani) | [LinkedIn](https://linkedin.com/in/kushalaswani)

---

## 🪪 License

This project is licensed under the [MIT License](LICENSE).
