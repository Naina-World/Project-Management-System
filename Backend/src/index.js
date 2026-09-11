import "dotenv/config";
import express from "express";
import cors from "cors";
import { initialiseDatabse } from "./config/index.js";
import userRoutes from "./routes/user.route.js";
import projectRoutes from "./routes/project.route.js";
import taskRoutes from "./routes/task.route.js";
const app = express();

const allowedOrigins = (process.env.CORS_ORIGIN)
  .split(",")
  .map((origin) => origin.trim());

app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (e.g. curl, Postman, server-to-server)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`Origin ${origin} is not allowed by CORS`));
      }
    },
  })
);
app.use(express.json());
app.use(cors({
  origin: "https://project-management-system-alpha-five.vercel.app/",
  credentials: true,
}));

app.use("/user", userRoutes);
app.use("/projects", projectRoutes);
app.use("/tasks", taskRoutes);
initialiseDatabse();
const PORT = process.env.PORT || 8000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server started at port ${PORT}`);
});