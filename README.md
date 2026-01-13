# Pokédex Challenge 🚀

This repository contains a full-stack Pokédex application built with a **Rails 8 API backend** and a **Next.js frontend**, along with documentation that describes how Generative AI tools were intentionally used to design, refine, test, and productionize the project.

Before running the application, you will find the following important resources in the root of this repository:

- 📁 **`task_management_exercise/`**  
  Contains the complete Task Management API exercise, including prompts, implementation, testing strategy, and final results.

- 📄 **`POKEDEX_AI_GEN_PROMPTING.md`**  
  Documents the full Generative AI prompting process used to build, refactor, and harden the Pokédex project (prompts, refinements, validations, and improvements).

These documents are part of the technical evaluation and explain both the engineering decisions and the AI-assisted workflow used throughout this repository.

## 🐳 Running with Docker (Recommended)

The easiest way to run the project is using Docker. This will build both the API and the Frontend and set up everything automatically.

### Requirements
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running.

### Instructions
1. Open your terminal in the root directory of the project.
2. Run the following command:
   ```bash
   docker-compose up --build
   ```
3. Once the containers are ready:
   - **Frontend:** [http://localhost:3000](http://localhost:3000)
   - **Backend API:** [http://localhost:8000](http://localhost:8000)

---

## 🛠️ Running Locally (Manual Setup)

If you prefer to run the applications manually without Docker, follow these steps:

### Requirements
- Ruby **3.3+**
- Rails **8+**
- Node.js **20+**
- SQLite3

### 1. Backend (Rails API)
```bash
cd api
bundle install
rails db:prepare
rails s
```
*The API will be available at [http://localhost:8000](http://localhost:8000)*

### 2. Frontend (Next.js)
Open a new terminal and run:
```bash
cd frontend
npm install
npm run dev
```
*The frontend will be available at [http://localhost:3000](http://localhost:3000)*

---

## 👤 Demo User

The application includes a default user for testing:

- **Username:** `admin`
- **Password:** `admin`

