const express = require("express");
const moongoes = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors')
const dotenv = require("dotenv").config();

const authRoute = require("./routes/auth");
const todoRoute = require('./routes/todo')
const app = express();


moongoes
  .connect(process.env.DB_DATABASSE)
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch(() => {
    console.log("Database connection failed");
  });


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())

app.use("/api/user", authRoute);
app.use('/api/todo',todoRoute)

app.listen(8000);
