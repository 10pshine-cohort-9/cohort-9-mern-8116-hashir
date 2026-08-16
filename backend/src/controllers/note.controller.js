const Note = require("../models/note.model");

async function getNotes(req, res) {
  try {
    const notes = await Note.find({ user: req.user.id }).sort({
      updatedAt: -1,
    });

    res.status(200).json({
      success: true,
      notes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get the notes",
    });
  }
}

async function createNote(req, res) {
  try {
    const { heading, content } = req.body;

    const note = await Note.create({
      heading,
      content,
      user: req.user.id,
    });

    res.status(201).json({
      success: true,
      note,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create note",
    });
  }
}

async function updateNote(req, res) {
  try {
    const { heading, content } = req.body;

    const note = await Note.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id,
      },
      {
        heading,
        content,
      },
      {
        new: true,
      },
    );

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    res.status(200).json({
      success: true,
      note,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update note",
    });
  }
}

async function deleteNote(req, res) {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Note deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete the note",
    });
  }
}

module.exports = {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
};
