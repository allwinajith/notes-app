import React from "react";
import "../styles/notecard.css";
function NoteCard({ title, content, lastModified, onEdit, onDelete }) {
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return `${String(date.getDate()).padStart(2, "0")}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${date.getFullYear()}`;
  };
  return (
    <div className="note-card">
      <div className="note-header">
        <span>{title}</span>
        <div className="note-actions">
          <span className="icon" onClick={onEdit}>
            ✏️
          </span>
          <span className="icon" onClick={onDelete}>
            🗑️
          </span>
        </div>
      </div>
      <div className="note-content">{content}</div>
      <div className="note-footer">
        Last Modified : {formatDate(lastModified)}
      </div>
    </div>
  );
}

export default NoteCard;
