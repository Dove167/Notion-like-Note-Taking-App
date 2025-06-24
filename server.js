const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('layout', 'layouts/layout'); // Set default layout
app.use(expressLayouts);
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const database = require('./database');

// Middleware to pass notes to all views
app.use((req, res, next) => {
  res.locals.notes = database.getNotes('');
  next();
});

// Routes
app.get('/', (req, res) => {
  res.render('dashboard', {
    title: 'Dashboard',
    layout: 'layouts/layout'
  });
});

app.get('/notes', (req, res) => {
  const searchTerm = req.query.searchTerm || '';
  const notesList = database.getNotes(searchTerm);
  res.render('notes', { 
    title: 'All Notes',
    notes: notesList, 
    searchTerm: searchTerm,
    layout: 'layouts/layout'
  });
});

app.get('/notes/new', (req, res) => {
  res.render('createNote', { 
    title: 'New Note',
    layout: 'layouts/layout'
  });
});

app.post('/notes', (req, res) => {
  const { title, content } = req.body;
  database.addNote({ title, content });
  res.redirect('/notes');
});

app.get('/notes/:id', (req, res) => {
  const note = database.getNoteById(parseInt(req.params.id));
  if (note) {
    res.render('singleNote', {
          note: note,
          title: note.title,
          layout: 'layouts/layout'
        });
  } else {
    res.status(404).render('note404', {
          title: 'Note Not Found',
          layout: 'layouts/layout'
        });
  }
});

// API endpoints
app.post('/notes/:id/title', (req, res) => {
  const id = parseInt(req.params.id);
  const { title } = req.body;
  if (database.updateNoteTitle(id, title)) {
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

app.post('/notes/:id/content', (req, res) => {
  const id = parseInt(req.params.id);
  const { content } = req.body;
  if (database.updateNoteContent(id, content)) {
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

app.post('/notes/:id/delete', (req, res) => {
  const id = parseInt(req.params.id);
  database.deleteNote(id);
  res.redirect('/notes');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});