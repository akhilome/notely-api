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
      const { url } = req;
      if (!singleNotePath.test(url)) return; // TODO: add invalid route handler
      const baseURLPath = '/api/notes/';
      req.params = { id: url.slice(baseURLPath.length) };
      return NoteController.updateNote(req, res);
  }
}

module.exports = requestHander;

// ========== Utilities ========== //

// matches /api/notes/<id>
var singleNotePath = new RegExp(/^\/api\/notes\/\d{1,}\/?$/);
// matches /api/notes
var allNotesPath = new RegExp(/^\/api\/notes\/?$/);

function handleGET(req, res) {
  const { url } = req;

  if (allNotesPath.test(url)) {
    return NoteController.getNotes(req, res);
  } else if (singleNotePath.test(url)) {
    const baseURLPath = '/api/notes/';
    const id = url.slice(baseURLPath.length);
    req.params = { id };
    return NoteController.getSingleNote(req, res);
  }
}
