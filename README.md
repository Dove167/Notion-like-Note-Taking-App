# Notion-like Note Taking App

A lightweight Notion-inspired note taking application built with Node.js, Express, and EJS.

## Features

- 📝 Create, edit, and delete notes
- 🔍 Search through all notes
- ✨ Rich text editing with Quill.js
- 🌙 Dark/light theme toggle
- 📱 Responsive design

## Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **EJS** - Templating engine
- **Express-EJS-Layouts** - Layout support

### Frontend
- **Quill.js** - Rich text editor
- **CSS Variables** - Theme support
- **Vanilla JavaScript** - Client-side functionality

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

Key files:
- `server.js` - Main Express server
- `database.js` - In-memory note storage
- `public/` - Frontend assets (CSS, JS)
- `views/` - EJS templates

## Data Model

Notes have the following structure:
```javascript
{
  id: Number,
  title: String,
  content: String (HTML),
  timestamp: Date
}
```

## API Endpoints

- `GET /` - Dashboard
- `GET /notes` - List all notes
- `GET /notes/new` - New note form
- `POST /notes` - Create new note
- `GET /notes/:id` - View/edit single note
- `POST /notes/:id/title` - Update note title
- `POST /notes/:id/content` - Update note content
- `POST /notes/:id/delete` - Delete note

## Future Improvements

- Add user authentication
- Implement persistent database (SQLite/MongoDB)
- Add note organization (folders/tags)
- Support file attachments
- Add collaborative editing