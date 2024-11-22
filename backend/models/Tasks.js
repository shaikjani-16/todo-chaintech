import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    completed: { type: Boolean, default: false },
    dueDate: { type: Date, default: Date.now + 1 },
    category: {
      type: String,
      enum: ["WORK", "PERSONAL", "LOW", "MEDIUM", "URGENT"],
      default: "PERSONAL",
    },
  },
  { timestamps: true, strict: true }
);

// Correcting the export of the model
const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);

export default Task;
