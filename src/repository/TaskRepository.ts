import { Task } from "../models";

export class TaskRepository {

  public static getAll() {
    console.info("[TaskRepository:getAll]");

    return new Promise((resolve, reject) => {
      Task.model.findAll().then((result) => {
        // If result is null or undefined, send an empty array.
        result = result ? result : [];
        console.info(`[Task:getAll] Tasks size : ${result.length}`);
        resolve(result);
      }).catch((error) => {
        console.error("[Task:getAll]", error);
        reject(error);
      });
    });
  }
}
