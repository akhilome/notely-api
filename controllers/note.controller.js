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

function getSingleNote(req, res) {
  const { id } = req.params;
  const note = NoteService.getNoteById(id);
  if (!note) {
    res.status(404).json({
      success: false,
      message: 'Note not found',
      data: null
    });
  } else {
    res.status(200).json({
      success: true,
      message: 'Note fetched successfully',
      data: note
    });
  }
}

function updateNote(req, res) {
  const { id } = req.params;
  const { title, body } = req.body;
  const note = NoteService.getNoteById(id);

  if (!note) {
    return res.status(404).json({
      success: false,
      message: 'Note not found',
      data: null
    });
  }

  const updatedNote = NoteService.updateNote({ id, title, body });
  return res.status(200).json({
    success: true,
    message: 'Note updated successfully',
    data: updatedNote
  });
}

const NoteController = {
  createNote,
  getNotes,
  getSingleNote,
  updateNote
};

module.exports = NoteController;
