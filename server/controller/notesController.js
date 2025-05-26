// import { User } from "../model/userModel.js";
import { Note } from "../model/noteModel.js";

export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id }).sort({
      createdAt: -1,
    });

    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ error: "Server error fetching notes" });
  }
};

export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }

    const newNote = await Note.create({
      title,
      content,
      user: req.user.id,
    });

    res.status(201).json(newNote);
  } catch (err) {
    res.status(500).json({ error: "Server error creating note" });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    if (note.user.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ error: "Not authorized to update this note" });
    }

    const data = {};
    if (title !== undefined) data.title = title;
    if (content !== undefined) data.content = content;

    const updatedNote = await Note.findByIdAndUpdate(id, data, { new: true });

    res.status(200).json(updatedNote);
  } catch (err) {
    res.status(500).json({ error: "Server error updating note" });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    if (note.user.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ error: "Not authorized to delete this note" });
    }

    await Note.findByIdAndDelete(id);

    res.status(200).json({ message: "Note deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error deleting note" });
  }
};
