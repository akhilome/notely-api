function saveNote({ title, body }) {
  const id = getNextId();
  const previousNotes = fetchAllNotes();
  const newNote = { id, title, body };
  const updatedNotes = [...previousNotes, newNote];
  writeNotesToDB(updatedNotes);
  updateIdTracker();

  return newNote;
}

function getNotes() {
  const notes = fetchAllNotes();
  return notes;
}

function getNoteById(id) {
  const allNotes = fetchAllNotes();
  const [note] = allNotes.filter(note => note.id == id);
  return note;
}

function updateNote({ id, title = null, body = null }) {
  const allNotes = fetchAllNotes();
  const [noteToBeUpdated] = allNotes.filter(note => note.id == id);
  const remNotes = allNotes.filter(note => note.id != id);
  const updatedTitle = title || noteToBeUpdated.title;
  const updatedBody = body || noteToBeUpdated.body;

  const updatedNote = {
    ...noteToBeUpdated,
    title: updatedTitle,
    body: updatedBody
  };

  const updatedNotes = [...remNotes, updatedNote].sort((a, b) => a.id - b.id);
  writeNotesToDB(updatedNotes);

  return updatedNote;
}

function deleteNote(id) {
  const allNotes = fetchAllNotes();
  const remNotes = allNotes.filter(note => note.id != id);
  writeNotesToDB(remNotes);
  return id;
}

const NoteService = {
  saveNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote
};

module.exports = NoteService;

// ========== Service Utilities ========== //

const db = require('../db/notes.json');

function fetchAllNotes() {
  return db.notes;
}

function writeNotesToDB(notes) {
  db.notes = notes;
}

function getLastId() {
  const [lastId = 0] = db.usedIds.slice(-1);
  return lastId;
}

function getNextId() {
  const lastId = getLastId();
  return lastId + 1;
}

function updateIdTracker() {
  const nextId = getNextId();
  db.usedIds.push(nextId);
}
