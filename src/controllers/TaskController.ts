import { TaskRepository } from "../repository/TaskRepository";

export class TaskController {
  public static getAll(req, res) {
    console.info("[TaskController:getAll]");

    TaskRepository.getAll().then((tasks) => {
      res.status(200).json({ code: 200, data: tasks });
    }).catch((error) => {
      console.error("[TaskController:getAll]", error);
      res.status(400).json({ code: 400, message: "An Error occure !" });
    });
  }
}
