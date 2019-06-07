import { LiveController } from "../controllers/LiveController";

export function load(app) {
  // Live route
  app.route("/api/live")
    .get(LiveController.publish);
}
