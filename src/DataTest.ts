import {
  Task
} from "./models";

async function load() {
  console.info("[DataTest:load] Start to create Data Test !");

  // -_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_ ||| TASK ||| _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_

  // Create Task.
  const tasks: any = [
    { libelle: "Todo 1" }, //  0
    { libelle: "Todo 2" }, //  1
    { libelle: "Todo 3" }, //  2
    { libelle: "Todo 4" }  //  3
  ];

  // Task.alterTable(); if have !
  for (const key in tasks) {
    if (key !== null) {
      await new Promise((resolve) => {
        const task = tasks[key];
        console.info("[DataTest:load] Try to create", task);
        Task.model.create(task).then((res) => {
          console.info(`[DataTest:load] Task ${res.libelle} created.`);
          tasks[key] = res;
          resolve(true);
        }).catch((err) => {
          console.error("[DataTest:load] ERROR :", err);
          resolve(false);
        });
      });
    }
  }

  console.info("[DataTest:load] Data Test created !");

  process.exit(0);
}

load();
