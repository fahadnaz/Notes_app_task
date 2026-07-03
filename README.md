
# Notes App

A simple note-taking application built with React and Express.js + MongoDB.

## Project Structure

```
Notes-app/
├── Backend/          # Node.js/Express API server
│   ├── models/       # MongoDB models
│   ├── routes/       # API routes
│   ├── server.js     # Main server file
│   ├── package.json
│   └── .env
└── Frontend/         # React UI
    ├── src/          # React components
    ├── public/       # Static assets
    ├── package.json
    ├── vite.config.js
    └── .env
```

## Features

- ✅ Create notes with title and content
- ✅ View all notes in a grid layout
- ✅ Delete notes
- ✅ Auto-sorted by creation date (newest first)
- ✅ Responsive design
- ✅ No authentication required

## Prerequisites

- Node.js 16+ and npm
- MongoDB (local or MongoDB Atlas connection string)

## Setup & Running

### Backend Setup

1. Navigate to the Backend folder:
```bash
cd Backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure MongoDB in `.env`:
```
MONGODB_URI=mongodb://localhost:27017/notes-app
PORT=5000
```

For MongoDB Atlas, use:
```
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/notes-app
```

4. Start the backend server:
```bash
npm start
```

The API will be available at `http://localhost:5000/api`

### Frontend Setup

1. In a new terminal, navigate to the Frontend folder:
```bash
cd Frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/notes` | Get all notes |
| GET | `/api/notes/:id` | Get a specific note |
| POST | `/api/notes` | Create a new note |
| PATCH | `/api/notes/:id` | Update a note |
| DELETE | `/api/notes/:id` | Delete a note |

### Example: Create a Note

```bash
curl -X POST http://localhost:5000/api/notes \
  -H "Content-Type: application/json" \
  -d '{"title":"My Note","content":"This is the content"}'
```

## Testing

1. Open `http://localhost:3000` in your browser
2. Add a new note with a title and content
3. View notes in the grid
4. Delete notes by clicking the ✕ button

## Technologies Used

**Backend:**
- Node.js
- Express.js
- MongoDB
- Mongoose

**Frontend:**
- React 18
- Vite
- CSS3


