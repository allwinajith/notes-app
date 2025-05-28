import { useContext, useState, useEffect } from "react";
import { UserContext } from "../src/context/UserContext";
import "../styles/notes.css";
import { TiDocumentAdd } from "react-icons/ti";
import useApi from "../hooks/useApi";
import NoteCard from "../components/NoteCard";

function Notes() {
  const { user } = useContext(UserContext);
  const [showPopup, setShowPopup] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const { sendRequest, loading, error } = useApi();
  const [notes, setNotes] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentNoteId, setCurrentNoteId] = useState(null);

  const cleanedName = user?.userName?.replace(/[0-9]/g, "").trim();
  const capitalize = (name) =>
    name ? name.charAt(0).toUpperCase() + name.slice(1).toLowerCase() : "Guest";

  const currentHour = new Date().getHours();
  let greeting = "Good Morning";
  if (currentHour >= 12 && currentHour < 17) greeting = "Good Afternoon";
  else if (currentHour >= 17 && currentHour < 21) greeting = "Good Evening";
  else if (currentHour >= 21 || currentHour < 5) greeting = "Good Night";

  const handleClose = () => {
    setShowPopup(false);
    setTitle("");
    setDesc("");
    setEditMode(false);
    setCurrentNoteId(null);
  };

  const handleAdd = async () => {
    if (loading) return;

    if (!title.trim() || !desc.trim()) {
      alert("Both Title and Description are required.");
      return;
    }

    const data = {
      title: title.trim(),
      content: desc.trim(),
    };

    const response = await sendRequest({
      url: "http://localhost:3000/api/notes",
      method: "post",
      data,
      withAuth: true,
    });

    if (response) {
      alert("Note added successfully!");
      handleClose();
      setNotes((prevNotes) => [...prevNotes, response]);
    } else {
      alert(error || "Failed to add note.");
    }
  };

  const handleEdit = (noteId) => {
    const noteToEdit = notes.find((n) => n._id === noteId); // Changed from 'id' to '_id'
    if (!noteToEdit) return;

    setTitle(noteToEdit.title);
    setDesc(noteToEdit.content);
    setCurrentNoteId(noteId);
    setEditMode(true);
    setShowPopup(true);
  };

  const handleSave = async () => {
    if (loading) return;

    if (!title.trim() || !desc.trim()) {
      alert("Both Title and Description are required.");
      return;
    }

    const data = {
      title: title.trim(),
      content: desc.trim(),
    };

    const response = await sendRequest({
      url: `http://localhost:3000/api/notes/${currentNoteId}`,
      method: "put",
      data,
      withAuth: true,
    });

    if (response) {
      alert("Note updated successfully!");
      setNotes(
        (prevNotes) =>
          prevNotes.map((note) =>
            note._id === currentNoteId ? response : note
          ) // Changed from 'id' to '_id'
      );
      handleClose();
    } else {
      alert(error || "Failed to update note.");
    }
  };

  const handleDelete = async (noteId) => {
    // Added noteId parameter
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this note?"
    );
    if (!confirmDelete) return;

    const response = await sendRequest({
      url: `http://localhost:3000/api/notes/${noteId}`, // Use the passed noteId
      method: "delete",
      withAuth: true,
    });

    if (response) {
      alert("Note deleted successfully!");
      setNotes(
        (prevNotes) => prevNotes.filter((note) => note._id !== noteId) // Changed from 'id' to '_id'
      );
      if (noteId === currentNoteId) {
        // Only close if deleting the currently edited note
        handleClose();
      }
    } else {
      alert(error || "Failed to delete note.");
    }
  };

  useEffect(() => {
    const fetchNotes = async () => {
      const response = await sendRequest({
        url: "http://localhost:3000/api/notes",
        method: "get",
        withAuth: true,
      });
      if (response) {
        setNotes(response);
      }
    };
    fetchNotes();
  }, []);

  return (
    <div className="notes-container">
      <div className="headContainer">
        <h1 className="heading">
          {greeting}, {capitalize(cleanedName)}
        </h1>
        <span
          onClick={() => {
            setShowPopup(true);
            setEditMode(false);
          }}
          style={{ cursor: "pointer", zIndex: 10 }}
        >
          <TiDocumentAdd
            size={40}
            style={{
              padding: "5px",
              borderRadius: "50%",
              background: "#e9967a70",
            }}
          />
        </span>
      </div>
      <div className="notescontainer">
        {notes.length === 0 ? (
          <p>No notes available.</p>
        ) : (
          notes.map((note) => (
            <NoteCard
              key={note._id} // Changed from 'id' to '_id'
              title={note.title}
              content={note.content}
              lastModified={note.updatedAt || note.createdAt} // Use updatedAt or createdAt
              onEdit={() => handleEdit(note._id)} // Changed from 'id' to '_id'
              onDelete={() => handleDelete(note._id)} // Changed from 'id' to '_id'
            />
          ))
        )}
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <div className="popup-header">
              <span>{editMode ? "Edit Note" : "Add Note"}</span>
              <button onClick={handleClose}>×</button>
            </div>
            <div className="popup-body">
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                placeholder="Description"
                rows={5}
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
              <div className="popup-buttons">
                {editMode ? (
                  <>
                    <button
                      className="add-btn"
                      onClick={handleSave}
                      disabled={loading}
                    >
                      {loading ? "Saving..." : "Save"}
                    </button>
                    <button
                      className="cancel-btn"
                      onClick={handleClose}
                      disabled={loading}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="add-btn"
                      onClick={handleAdd}
                      disabled={loading}
                    >
                      {loading ? "Adding..." : "Add"}
                    </button>
                    <button
                      className="cancel-btn"
                      onClick={handleClose}
                      disabled={loading}
                    >
                      Close
                    </button>
                  </>
                )}
              </div>
              {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Notes;
