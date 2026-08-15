import express from "express";
import { initialiseDatabse } from "./config/index.js";
import userRoutes from "./routes/user.route.js";
import projectRoutes from "./routes/project.route.js";
import taskRoutes from "./routes/task.route.js";
const app = express();
app.use(express.json());

app.use("/user", userRoutes);
app.use("/projects", projectRoutes);
app.use("/tasks", taskRoutes);
initialiseDatabse();
app.listen(8000, async () => {
  console.log("server started at port 8000");
});
