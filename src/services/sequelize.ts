import dotenv = require("dotenv");
import Sequelize = require("sequelize");
dotenv.config();

let instance: Db = null;

class Db {
  public sequelize: any;

  constructor() {
    const port: any = process.env.DATABASE_PORT;

    this.sequelize = new Sequelize(process.env.DATABASE_DB_NAME,
      process.env.DATABASE_USERNAME,
      process.env.DATABASE_PASSWORD,
      {
        host: process.env.DATABASE_HOST,
        port,
        dialect: process.env.DATABASE_DIALECT,
        operatorsAliases: false,
        pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000
        },
        logging: false
      }
    );
  }
}

export function getInstance() {
  if (instance === null) {
    instance = new Db();

    instance.sequelize.authenticate().then(() => {
      console.info("Connection has been established successfully.");
    }).catch((error: any) => {
      console.error("Unable to connect to the database:", error);
    });
  }

  return instance.sequelize;
}
