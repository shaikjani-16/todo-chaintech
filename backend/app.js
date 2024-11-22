import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import taskRoutes from "./routes/task.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Routes
app.use("/api/tasks", taskRoutes);

const PORT = 5000;
app.get("/", (req, res) => {
  res.send("Hello from server");
});
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
module.exports = app;
