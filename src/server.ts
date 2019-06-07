import bodyParser = require("body-parser");
import cors = require("cors");
import dotenv = require("dotenv");
import express = require("express");
import router = require("./router");
import sequelize = require("./services/sequelize");

dotenv.config();
const port = process.env.PORT || 4000;

// @ts-ignore Needed if the server use PhusoinPassenger !!
if (typeof(PhusionPassenger) !== "undefined") {
  // @ts-ignore
  PhusionPassenger.configure({ autoInstall: false });
}

// Init Sequelize.
sequelize.getInstance();

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", (req, res, next) => {
  console.info(`${req.method} ${req.originalUrl} with params: ${JSON.stringify(req.params)} and body: ${JSON.stringify(req.body)}`);
  next();
});

router.load(app);

// @ts-ignore
if (typeof(PhusionPassenger) !== "undefined") {
  app.listen("passenger");
} else {
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
}

app.use((req: any, res: any) => {
  res.status(404).send({url: `${req.originalUrl} not found` });
});
