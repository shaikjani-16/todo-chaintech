import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import taskRoutes from "./routes/task.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
import mongoose from "mongoose";

let isConnected = false; // Track the database connection state

const connectDB = async () => {
  if (isConnected) {
    return; // Use existing connection
  }
  try {
    const db = await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = db.connections[0].readyState === 1; // Connection successful
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

connectDB();

// Routes
app.use("/api/tasks", taskRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("Hello from the server!");
});

export default app;
