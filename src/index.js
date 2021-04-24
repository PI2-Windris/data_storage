const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const generatorRouter = require("./router/generator");
const receiver = require("./mqtt/receiver");
const logger = require("./utils/logger");
const generatorController = require("./controllers/generator");

const app = express();

mongoose.connect(process.env.MONGO_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const { connection } = mongoose;

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

connection.once("open", () => {
  logger.info("MongoDB database connection established successfully");
});

app.use("/generator", generatorRouter);

app.listen(process.env.PORT, () => {
  logger.info("Server is running on Port: ", process.env.PORT);
});

receiver.connect(
  () => {
    logger.info("Connected to Broker");
  },
  () => {
    logger.info("Message Received");
  }
);

// This schedule sets it to run everyday at 3:00 a.M
cron.schedule("00 00 03 * * *", async () => {
  logger.info("Running Mail Verification");
  await generatorController.verifyMaintenance();
});
