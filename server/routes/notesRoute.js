import express from 'express'
import { createNote, deleteNote, getNotes, updateNote } from "../controller/notesController.js";
import { authMiddleware } from "../middleware/auth_mid.js";

const notesRoute = express.Router()
notesRoute.use(authMiddleware);

notesRoute.get("/", getNotes);
notesRoute.post("/", createNote);
notesRoute.put("/:id", updateNote);
notesRoute.delete("/:id", deleteNote);

export default notesRoute;