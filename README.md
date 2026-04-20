# Test Server:
// frontend artist :
Name : AKSHAT TEWARI
Roll no : 2300320130026

// Backend Artist ::
Name :MAyank Kumar 
Roll no : 2300320130148



Online test platform with three portals:

- `Admin Portal` for dashboard and quiz management
- `Teacher Portal` for question bank operations
- `User Portal` for quiz attempts and results

## Features

- Quiz instructions before start
- Negative marking support
- Prev/Next navigation and final submit on last question
- Question types: `quiz`, `theory`, `coding`
- Subject-wise question handling (`Java`, `Python`, `DSA`, `Aptitude`, `React`, `Frontend`, `Backend`)
- Maximum 10 questions allowed per quiz
- UI themes: `Dark Blue` and `White Cream`

## Tech Stack

- Frontend: React + Vite
- Backend: Node.js + Express
- Data Layer: in-memory mock DB (`backend/src/data/mockDb.js`)

## Project Structure

```text
Test-Server/
  backend/
    package.json
    src/
      server.js
      controllers/
        adminController.js
        quizController.js
        teacherController.js
      data/
        mockDb.js
      routes/
        adminRoutes.js
        quizRoutes.js
        teacherRoutes.js
  frontend/
    package.json
    index.html
    vite.config.js
    src/
      App.jsx
      main.jsx
      styles.css
      api/
        client.js
      portals/
        AdminPortal.jsx
        TeacherPortal.jsx
        UserPortal.jsx
```

## Run Locally

### Backend

```bash
cd backend
npm install
npm run dev
```

Backend URL: `http://localhost:5000`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend URL: `http://localhost:5173`

## API Routes

- `GET /api/health`
- `GET /api/admin/dashboard`
- `GET /api/admin/quizzes`
- `POST /api/admin/quizzes`
- `GET /api/teacher/questions`
- `POST /api/teacher/questions`
- `PUT /api/teacher/questions/:id`
- `GET /api/quizzes`
- `GET /api/quizzes/:quizId/instructions`
- `POST /api/quizzes/:quizId/start`
- `POST /api/quizzes/submit`

## Next Improvements

- Authentication (admin/teacher/user login)
- Persistent DB (MongoDB/PostgreSQL)
- Quiz timer and auto-submit
- Attempt history and analytics
- Coding judge integration
