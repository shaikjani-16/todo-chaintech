import React, { useState, useEffect } from "react";
import TaskList from "./components/TaskList";
import EditModal from "./components/Edit";
import TaskForm from "./components/TaskForm";
import { getTasks } from "./services/taskService";
const App = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const fetchTasks = async () => {
    try {
      const data = await getTasks();

      setTasks(data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };
  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
      } else {
        console.error("Failed to delete task");
      }
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowEditModal(true);
  };

  const handleSave = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === updatedTask._id ? updatedTask : task
      )
    );
    setShowEditModal(false);
  };

  return (
    <div>
      <h1>Task Management</h1>
      <TaskForm update={fetchTasks} />
      <TaskList
        tasks={tasks}
        onDelete={handleDelete}
        onEdit={handleEdit}
        fetchTasks={fetchTasks}
      />
      {showEditModal && (
        <EditModal
          task={editingTask}
          onSave={handleSave}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </div>
  );
};

export default App;
