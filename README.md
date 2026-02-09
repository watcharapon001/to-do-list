# To-Do List App (MEAN Stack - Lite)

A simple CRUD To-Do list application built with **Angular** (Frontend) and **Node.js/Express** (Backend).

## Features
- **Add Tasks**: Create new to-do items.
- **View Tasks**: See a list of all tasks.
- **Filter**: View All, Active, or Completed tasks.
- **Edit**: Update task titles.
- **Delete**: Remove tasks (with confirmation).
- **Toggle**: Mark tasks as done/undone.
- **Data Persistence**: In-memory (resets on backend restart).

## Prerequisites
- Node.js (v18+)
- npm
- **Firebase Project & Service Account Key**

## Getting Started

### 0. Configure Firebase
1. Place your `firebase-keys.json` file in the `backend/` folder.
2. Ensure the file name matches `firebase-keys.json` (or update `server.js`).

### 1. Start the Backend
The backend runs on port `3000`.

```bash
cd backend
npm install
npm run dev
```

### 2. Start the Frontend
The frontend runs on port `4200`.

Open a new terminal:

```bash
cd frontend
npm install
ng serve
```

### 3. Usage
Open your browser and navigate to `http://localhost:4200`.

## API Endpoints
- `GET /api/todos` - Get all tasks
- `POST /api/todos` - Create a task
- `PUT /api/todos/:id` - Update a task
- `DELETE /api/todos/:id` - Delete a task