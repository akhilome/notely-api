const path = require('path');
const fs = require('fs');

function saveNote({ title, body }) {
  const id = getNextId();
  const previousNotes = readNotesFromFS();
  const newNote = { id, title, body };
  const updatedNotes = [...previousNotes, newNote];
  writeNotesToFS(updatedNotes);

  return newNote;
}

function getNotes() {
  const notes = readNotesFromFS();
  return notes;
}

function getNoteById(id) {
  const allNotes = readNotesFromFS();
  const [note] = allNotes.filter(note => note.id == id);
  return note;
}

const NoteService = { saveNote, getNotes, getNoteById };

module.exports = NoteService;

// ========== Service Utilities ========== //

function readNotesFromFS() {
  const notes = fs.readFileSync(path.join(__dirname, '../db/notes.json'), {
    encoding: 'utf8'
  });
  let allNotes;
  if (notes == '') {
    allNotes = [];
  } else {
    allNotes = JSON.parse(notes);
  }

  return allNotes;
}

function getNextId() {
  const allNotes = readNotesFromFS();
  return allNotes.length + 1;
}

function writeNotesToFS(notes) {
  fs.writeFileSync(
    path.join(__dirname, '../db/notes.json'),
    JSON.stringify(notes)
  );
}
