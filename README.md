# Project Management System

A simple project management app — create projects, assign people to them, and track tasks through pending, in progress, and completed.

Built with:
- **Backend:** Node.js, Express, MongoDB (Mongoose)
- **Frontend:** React, Vite, Tailwind CSS

## Folder structure

```
Project-Management-System/
├── Backend/
└── Frontend/
```

## How this was initialized

### Backend (Node)

```bash
mkdir Backend && cd Backend
npm init -y
npm install express mongoose cors dotenv
```

Then `"type": "module"` was added to `package.json` to use ES module imports (`import`/`export`).

### Frontend (React)

```bash
npm create vite@latest Frontend -- --template react
cd Frontend
npm install
npm install react-router-dom
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Tailwind's content paths in `tailwind.config.js` were set to scan `./index.html` and `./src/**/*.{js,jsx}`, and the `@tailwind base/components/utilities` directives were added to `src/index.css`.

## Setup

### Backend

```bash
cd Backend
npm install
cp .env.example .env
```

Add your Mongo connection string to `.env`:

```
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.te1a3yu.mongodb.net/project_management
PORT=8000
```

Run it:

```bash
npm start
```

Runs on `http://localhost:8000`.

### Frontend

```bash
cd Frontend
npm install
cp .env.example .env
npm run dev
```

Runs on `http://localhost:5173`, and talks to the backend at the URL set in `Frontend/.env` (`VITE_API_URL`).

## API routes

**Users**
- `POST /user/create-user` — `{ name, email }`
- `GET /user/get-users`

**Projects**
- `POST /projects/create-project` — `{ title, description, createdBy, teamMembers }`
- `GET /projects/get-project`
- `PUT /projects/update/project/:id`
- `DELETE /projects/delete/project/:id`

**Tasks**
- `POST /tasks/create-task` — `{ title, description, projectId, createdBy, assignedTo, status }`
- `GET /tasks/get-task`
- `PUT /tasks/update/task/:id`
- `DELETE /tasks/delete/task/:id`

## Usage

1. Add a few people first (Team page) — projects and tasks both need a valid user id.
2. Create a project and assign it an owner + team.
3. Add tasks to the project and assign them to people.
4. Move tasks through pending → in progress → completed from the task board.

## To do

- Add authentication — right now anyone can hit any endpoint.
- Add proper validation on the backend.
- Restrict task `status` to fixed values at the database level, not just in the UI.
