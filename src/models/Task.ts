import Sequelize = require("sequelize");
import sequelize = require("../services/sequelize");

export class Task {
  public static model = sequelize.getInstance().define("task", {
    libelle: { type: Sequelize.STRING(255), allowNull: false }
  });
}
