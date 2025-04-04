const express = require("express");
const router = express.Router();
const Note = require("../models/Note");

// Get all notes
router.get("/", async (req, res) => {
  try {
    const note = await Note.find();
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

// Create a new note
router.post("/", async (req, res) => {
  try {
    const note = new Note({
      title: req.body.title,
      content: req.body.content,
      date: req.body.date,
    });

    await note.save();
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// Update a note
router.put("/:id", async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        content: req.body.content,
        date: req.body.date,
      },
      { new: true }
    );
    res.status(204).json({message: "Note updated successfully", note});
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// Delete a note
router.delete("/:id", async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.status(204).json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

module.exports = router;
