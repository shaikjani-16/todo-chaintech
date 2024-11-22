import React from "react";
import { Trash2, Edit, CheckCheck } from "lucide-react";

const TaskItem = ({ task, onDelete, onEdit, fetchTasks }) => {
  // Define background colors for categories
  const categoryColors = {
    URGENT: "#ff4d4d",
    WORK: "#4da6ff",
    PERSONAL: "#ffcc66",
    LOW: "#b3b3b3",
    MEDIUM: "#ffa64d",
    default: "#fff",
  };
  const onCheck = async (id, currentStatus) => {
    try {
      const res = await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          completed: !currentStatus, // Toggle the completed status
        }),
      });

      if (!res.status == 200) {
        throw new Error("Failed to update task status");
      }

      const updatedTask = await res.json();
      console.log("Task updated:", updatedTask);
      fetchTasks();
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };
  // Determine the background color based on the category
  const backgroundColor =
    categoryColors[task.category] || categoryColors.default;

  return (
    <div
      style={{
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        borderRadius: "10px",
        padding: "15px",
        margin: "10px",
        backgroundColor, // Dynamic background color
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        color: task.category === "URGENT" ? "#fff" : "#333", // White text for better contrast in "URGENT"
        overflow: "hidden", // Prevent overflow
        minWidth: "300px",
        maxWidth: "600px", // Ensure card width
      }}
    >
      <div
        style={{
          flex: 1,
          marginRight: "15px", // Add spacing between text and buttons
          overflow: "hidden",
        }}
      >
        <h3
          style={{
            margin: "0 0 10px",
            whiteSpace: "nowrap", // Prevent title from wrapping
            textOverflow: "ellipsis",
            overflow: "hidden",
            font: "message-box",
            fontSize: "1.2rem",
            fontWeight: "bold",
            textDecoration: task.completed ? "line-through" : "none",
            textDecorationThickness: "3px",
          }}
        >
          {task.title}
        </h3>
        <p
          style={{
            margin: "0 0 10px",
            color: "yellow",
            whiteSpace: "normal", // Allow wrapping for descriptions
            wordWrap: "break-word", // Break long words
            overflow: "hidden", // Prevent spilling outside the card
            display: "-webkit-box",
            font: "bold",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 3, // Limit to 3 lines
            textDecoration: task.completed ? "line-through" : "none",
            textDecorationThickness: "3px",
          }}
        >
          {task.description}
        </p>
        <p
          style={{
            margin: "0 0 5px",
            fontSize: "0.9rem",
            textDecoration: task.completed ? "line-through" : "none",
            textDecorationThickness: "3px",
          }}
        >
          <strong>Category:</strong> {task.category || "None"}
        </p>
        <p
          style={{
            margin: "0 0 5px",
            fontSize: "0.9rem",
            textDecoration: task.completed ? "line-through" : "none",
            textDecorationThickness: "3px",
          }}
        >
          <strong>Due Date:</strong>{" "}
          {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "None"}
        </p>
        <p
          style={{
            margin: 0,
            fontSize: "0.9rem",
            color: task.completed ? "green" : "red",
            textDecoration: task.completed ? "line-through" : "none",
            textDecorationThickness: "3px",
          }}
        >
          <strong>Status:</strong> {task.completed ? "Completed" : "Pending"}
        </p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <button
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: task.category === "URGENT" ? "#fff" : "red",
          }}
          onClick={() => onDelete(task._id)}
          title="Delete Task"
        >
          <Trash2 size={20} />
        </button>
        <button
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: task.category === "URGENT" ? "#fff" : "blue",
            opacity: task.completed ? 0.5 : 1,
          }}
          onClick={() => onEdit(task)}
          title="Edit Task"
          disabled={task.completed}
        >
          <Edit size={20} />
        </button>
        <button
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: task.category === "URGENT" ? "#fff" : "blue",
          }}
          onClick={() => onCheck(task._id, task.completed)}
          title="Mark Completed"
        >
          <CheckCheck size={20} />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
