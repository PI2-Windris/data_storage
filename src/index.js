
const express = require("express");
const mongoose = require("mongoose");
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const app = express();
const generatorRouter = require('./router/generator');
const receiver = require('./mqtt/receiver');

mongoose.connect(process.env.MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true });
const connection = mongoose.connection;

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

connection.once("open", function() {
  console.log("MongoDB database connection established successfully");
});

app.use('/generator', generatorRouter);

app.listen(process.env.PORT, () => {
  console.log("Server is running on Port: ", process.env.PORT);
})

receiver.connect(()=>{
  console.log('Connected to Broker')
}, () => {
  console.log('Message Received');
});