import { useContext, useState } from "react";
import { UserContext } from "../context/userContext";
import "../styles/notes.css";
import { TiDocumentAdd } from "react-icons/ti";
import useApi from "../hooks/useApi";

function Notes() {
  const { user } = useContext(UserContext);
  const [showPopup, setShowPopup] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const { sendRequest, loading, error } = useApi();

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
    } else {
      alert(error || "Failed to add note.");
    }
  };

  return (
    <div className="notes-container">
      <h1 className="heading">
        {greeting}, {capitalize(cleanedName)}
      </h1>

      <span
        onClick={() => setShowPopup(true)}
        style={{ cursor: "pointer", zIndex: 10 }}
      >
        <TiDocumentAdd
          size={40}
          style={{
            position: "absolute",
            bottom: "30px",
            right: "30px",
            padding: "5px",
            borderRadius: "50%",
            background: "#e9967a70",
          }}
        />
      </span>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <div className="popup-header">
              <span>Add Notes</span>
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
                  Cancel
                </button>
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
