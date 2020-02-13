const NoteController = require('../controllers/note.controller');

function requestHander(req, res) {
  const { method } = req;

  switch (method) {
    case 'POST':
      const newNote = NoteController.createNote(req, res);
      return newNote;
    case 'GET':
      const notes = NoteController.getNotes(req, res);
      return notes;
  }
}

module.exports = requestHander;
