import NoteService from '../services/note.service';

function createNote(req, res) {
  const { title, body } = req.body;
  const createdNote = NoteService.saveNote({ title, body });
  res.status(200).json({
    success: true,
    message: 'Note created successfully',
    data: createdNote
  });
}

function getNotes(req, res) {
  const notes = NoteService.getNotes();
  res.status(200).json({
    success: true,
    message: 'Notes fetched successfully',
    data: notes
  });
}

const NoteController = { createNote, getNotes };

module.exports = NoteController;
