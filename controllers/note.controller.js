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

const NoteController = { createNote };

module.exports = NoteController;
