const fs = require('fs');
const path = require('path');

const NOTES_FILE = path.join(__dirname, 'notes.json');

let notes = [];
let currentId = 1;

function loadNotes() {
  try {
    const data = fs.readFileSync(NOTES_FILE, 'utf8');
    notes = JSON.parse(data);
    if (notes.length > 0) {
      currentId = Math.max(...notes.map(note => note.id)) + 1;
    } else {
      currentId = 1;
    }
  } catch (error) {
    if (error.code === 'ENOENT') {
      // File does not exist, create it with initial data
      notes = [
        {
          id: 1,
          title: 'Welcome to Notion Clone',
          content: '<h1>Welcome</h1><p>This is your first note. Try editing me!</p>',
          timestamp: new Date()
        },
        {
          id: 2,
          title: 'Getting Started',
          content: '<h2>Getting Started</h2><ul><li>Create new notes</li><li>Edit existing ones</li><li>Organize your thoughts</li></ul>',
          timestamp: new Date()
        }
      ];
      saveNotes(); // Save initial notes to file
    } else {
      console.error('Error loading notes:', error);
      notes = []; // Fallback to empty array on other errors
    }
  }
}

function saveNotes() {
  try {
    fs.writeFileSync(NOTES_FILE, JSON.stringify(notes, null, 2), 'utf8');
  } catch (error) {
    console.error('Error saving notes:', error);
  }
}

// Load notes when the module is first loaded
loadNotes();

module.exports = {
  getNotes: function(searchTerm) {
    loadNotes(); // Ensure notes are fresh
    if (!searchTerm) return notes;
    return notes.filter(note =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
  },
  getNoteById: function(id) {
    loadNotes(); // Ensure notes are fresh
    return notes.find(note => note.id === id);
  },
  addNote: function(note) {
    loadNotes(); // Ensure notes are fresh before adding
    note.id = currentId++;
    note.timestamp = new Date();
    note.content = note.content || '<p>Start writing here...</p>';
    notes.push(note);
    saveNotes();
    return note;
  },
  updateNoteTitle: function(id, title) {
    loadNotes(); // Ensure notes are fresh before updating
    const note = this.getNoteById(id);
    if (note) {
      note.title = title;
      note.timestamp = new Date();
      saveNotes();
      return true;
    }
    return false;
  },
  updateNoteContent: function(id, content) {
    loadNotes(); // Ensure notes are fresh before updating
    const note = this.getNoteById(id);
    if (note) {
      note.content = content;
      note.timestamp = new Date();
      saveNotes();
      return true;
    }
    return false;
  },
  deleteNote: function(id) {
    loadNotes(); // Ensure notes are fresh before deleting
    notes = notes.filter(note => note.id !== id);
    saveNotes();
  }
};
