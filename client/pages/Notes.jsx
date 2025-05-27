import React, { useState } from "react";

function Notes() {
  const [name, setName] = useState("Ajith");
  return (
    <div className="notes-container">
      <h1>Hi, welcome {name}</h1>
    </div>
  );
}

export default Notes;
