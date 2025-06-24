let notes = [
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
let currentId = 3;

module.exports = {
  getNotes: function(searchTerm) {
    if (!searchTerm) return notes;
    return notes.filter(note => 
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
  },
  getNoteById: function(id) {
    return notes.find(note => note.id === id);
  },
  addNote: function(note) {
    note.id = currentId++;
    note.timestamp = new Date();
    note.content = note.content || '<p>Start writing here...</p>';
    notes.push(note);
    return note;
  },
  updateNoteTitle: function(id, title) {
    const note = this.getNoteById(id);
    if (note) {
      note.title = title;
      note.timestamp = new Date();
      return true;
    }
    return false;
  },
  updateNoteContent: function(id, content) {
    const note = this.getNoteById(id);
    if (note) {
      note.content = content;
      note.timestamp = new Date();
      return true;
    }
    return false;
  },
  deleteNote: function(id) {
    notes = notes.filter(note => note.id !== id);
  }
};