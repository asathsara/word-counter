const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    title: String,
    content: String,
    date: String
})

module.exports = mongoose.model('Note', NoteSchema);
