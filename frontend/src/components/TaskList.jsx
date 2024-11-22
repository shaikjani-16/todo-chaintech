import React, { useState } from "react";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, onDelete, onEdit, fetchTasks }) => {
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  // Handle category change from dropdown
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // Filter tasks based on selected category
  const filteredTasks = tasks.filter((task) => {
    if (selectedCategory === "ALL") return true; // Show all tasks if "ALL" is selected
    return task.category === selectedCategory; // Filter by category
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Category Filter Dropdown */}
      <select
        value={selectedCategory}
        onChange={handleCategoryChange}
        style={{
          padding: "8px",
          marginBottom: "20px",
          alignItems: "center",
          margin: "auto",
          marginTop: "20px",
          fontSize: "16px",
          borderRadius: "5px",
          backgroundColor: "#f7f7f7",
        }}
      >
        <option value="ALL">All Categories</option>
        <option value="WORK">Work</option>
        <option value="PERSONAL">Personal</option>
        <option value="LOW">Low Priority</option>
        <option value="MEDIUM">Medium Priority</option>
        <option value="URGENT">Urgent</option>
      </select>

      {/* Render filtered tasks */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "15px",
          padding: "20px",
        }}
      >
        {filteredTasks.map((task) => (
          <TaskItem
            key={task._id}
            task={task}
            onDelete={onDelete}
            onEdit={onEdit}
            fetchTasks={fetchTasks}
            selectedCategory={selectedCategory} // Pass selected category to TaskItem
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
