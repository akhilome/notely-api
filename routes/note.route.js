const NoteController = require('../controllers/note.controller');

function requestHander(req, res) {
  const { method } = req;

  switch (method) {
    case 'POST':
      const newNote = NoteController.createNote(req, res);
      return newNote;
    case 'GET':
      const response = handleGET(req, res);
      return response;
    case 'PUT':
      if (!singleNotePath.test(req.url)) return handleInvalid(req, res);
      req.params = { id: req.url.slice(baseURLPath.length) };
      return NoteController.updateNote(req, res);
    case 'DELETE':
      if (!singleNotePath.test(req.url)) return handleInvalid(req, res);
      req.params = { id: req.url.slice(baseURLPath.length) };
      return NoteController.deleteNote(req, res);
    default:
      return handleInvalid(req, res);
  }
}

module.exports = requestHander;

// ========== Utilities ========== //

// matches /api/notes/<id>
var singleNotePath = new RegExp(/^\/api\/notes\/\d{1,}\/?$/);
// matches /api/notes
var allNotesPath = new RegExp(/^\/api\/notes\/?$/);
var baseURLPath = '/api/notes/';

function handleGET(req, res) {
  const { url } = req;

  if (allNotesPath.test(url)) {
    return NoteController.getNotes(req, res);
  } else if (singleNotePath.test(url)) {
    const id = url.slice(baseURLPath.length);
    req.params = { id };
    return NoteController.getSingleNote(req, res);
  }
}

function handleInvalid(req, res) {
  return res.status(404).json({
    success: false,
    message: 'Invalid route',
    data: null
  });
}
