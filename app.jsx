import React, { useState } from "react";
export default function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const handleAdd = () => {
    if (newItem.trim() === "") return;
    if (editIndex !== null) {
      const updated = [...items];
      updated[editIndex] = newItem;
      setItems(updated);
      setEditIndex(null);
    } else {
      setItems([...items, newItem]);
    }
    setNewItem("");
  };
  const handleEdit = (index) => {
    setNewItem(items[index]);
    setEditIndex(index);
  };
  const handleDelete = (index) => {
    const filtered = items.filter((_, i) => i !== index);
    setItems(filtered);
  };
  return (
    <div className="app-container">
      <h1>ONLINE BOOK</h1>

      <div className="input-section">
        <input
          type="text"
          placeholder="Enter item name"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <button onClick={handleAdd}>
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </div>

      <ul className="item-list">
        {items.map((item, index) => (
          <li key={index} className="item">
            <span>{item}</span>
            <div className="btn-group">
              <button className="edit-btn" onClick={() => handleEdit(index)}>
                Edit
              </button>
              <button
                className="delete-btn"
                onClick={() => handleDelete(index)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
