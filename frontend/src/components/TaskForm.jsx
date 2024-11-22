import React, { useState } from "react";
import { createTask } from "../services/taskService";

const TaskForm = ({ update }) => {
  const getToday = () => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // Returns "YYYY-MM-DD"
  };
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(getToday());
  const [category, setCategory] = useState("PERSONAL");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createTask({ title, description, dueDate, category });
      setTitle("");
      setDescription("");
      setDueDate(getToday());
      setCategory("PERSONAL");
      update();
    } catch (err) {
      console.error("Error creating task:", err);
      alert("Failed to create task. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        background: "#fff",
        padding: "20px",
        borderRadius: "10px",
        marginBottom: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        maxWidth: "300px",
        margin: "0 auto",
      }}
    >
      <h2 style={{ margin: 0, fontSize: "1.5rem", color: "#333" }}>
        Add a New Task
      </h2>
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        style={{
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          fontSize: "1rem",
        }}
      />
      <textarea
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows="4"
        style={{
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          fontSize: "1rem",
        }}
      />
      <label style={{ fontSize: "0.9rem", color: "#555" }}>
        Due Date:
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          min={getToday()}
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            fontSize: "1rem",
            marginTop: "5px",
          }}
        />
      </label>
      <label style={{ fontSize: "0.9rem", color: "#555" }}>
        Category:
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            fontSize: "1rem",
            marginTop: "5px",
            width: "100%",
          }}
        >
          <option value="WORK">Work</option>
          <option value="PERSONAL">Personal</option>
          <option value="LOW">Low Priority</option>
          <option value="MEDIUM">Medium Priority</option>
          <option value="URGENT">Urgent</option>
        </select>
      </label>
      <button
        type="submit"
        style={{
          padding: "10px 20px",
          background: "blue",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          fontSize: "1rem",
          cursor: "pointer",
          alignSelf: "flex-start",
        }}
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
