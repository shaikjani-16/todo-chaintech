import React, { useState } from "react";

const EditModal = ({ task, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    title: task?.title || "",
    description: task?.description || "",
    category: task?.category || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/tasks/${task._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const updatedTask = await response.json();
        onSave(updatedTask);
      } else {
        const error = await response.json();
        alert(`Failed to update task: ${error.message}`);
      }
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: "#fff",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        width: "90%",
        border: "1px solid #ccc",
        maxWidth: "300px",
      }}
    >
      <h3>Edit Task</h3>
      <div style={{ marginBottom: "10px" }}>
        <label
          htmlFor="title"
          style={{ display: "block", marginBottom: "5px" }}
        >
          Title:
        </label>
        <input
          id="title"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          style={{
            width: "90%",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label
          htmlFor="description"
          style={{ display: "block", marginBottom: "5px" }}
        >
          Description:
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          style={{
            width: "90%",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label
          htmlFor="category"
          style={{ display: "block", marginBottom: "5px" }}
        >
          Category:
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          style={{
            width: "98%",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        >
          <option value="WORK">Work</option>
          <option value="PERSONAL">Personal</option>
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="URGENT">Urgent</option>
        </select>
      </div>
      <div style={{ textAlign: "right" }}>
        <button
          onClick={handleSave}
          style={{
            padding: "10px 15px",
            background: "blue",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            marginRight: "10px",
            cursor: "pointer",
          }}
        >
          Save
        </button>
        <button
          onClick={onClose}
          style={{
            padding: "10px 15px",
            background: "red",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditModal;
