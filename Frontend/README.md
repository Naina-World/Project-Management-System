# Docket — Project Management Frontend

A React + Tailwind frontend for the Express/MongoDB Project Management API, covering:

- **Overview** — live counts of projects, tasks, team members, and a task-status breakdown.
- **Projects** — create, edit, delete projects; assign an owner and a team.
- **Tasks** — a three-column board (Pending / In progress / Completed), create/edit/delete tasks, change status inline.
- **Team** — add people, see who owns what and who's assigned what.

## 1. Backend setup

The backend in this project is missing CORS support, which blocks browser requests from a different port (Vite runs on `5173`, the API on `8000`). A `cors` middleware call has already been added to `src/index.js` and `cors` added to `package.json`.

From the backend folder:

```bash
npm install
npm start
```

This starts the API at `http://localhost:8000`.

## 2. Frontend setup

From this folder:

```bash
npm install
cp .env.example .env   # adjust VITE_API_URL if your backend runs elsewhere
npm run dev
```

Open the printed local URL (usually `http://localhost:5173`).

## 3. Suggested first steps in the app

1. Go to **Team** and add a couple of people — the API requires a valid user id for `createdBy` on both projects and tasks.
2. Go to **Projects** and create a project, picking an owner and (optionally) team members.
3. Go to **Tasks** and create tasks against that project, assigning them to people and setting a status.

## Notes on the API contract

| Resource | Endpoints |
| --- | --- |
| Users | `POST /user/create-user`, `GET /user/get-users` |
| Projects | `POST /projects/create-project`, `GET /projects/get-project`, `PUT /projects/update/project/:id`, `DELETE /projects/delete/project/:id` |
| Tasks | `POST /tasks/create-task`, `GET /tasks/get-task`, `PUT /tasks/update/task/:id`, `DELETE /tasks/delete/task/:id` |

Task `status` is a free-text field on the backend; the frontend constrains it to `pending`, `in-progress`, `completed` to match the board columns. There is currently no authentication on the API — anyone who can reach it can call any endpoint, which is worth addressing before this goes further than local development.
