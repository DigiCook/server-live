import { TaskController } from "../controllers/TaskController";

export function load(app) {
  // Task Routes
  app.route("/api/task")
    .get(TaskController.getAll);
}
