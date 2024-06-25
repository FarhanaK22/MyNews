const express = require("express");
const bodyParser = require("body-parser");
const { createServer } = require("http");
const cors = require("cors");
const { url } = require("inspector");
const { error } = require("console");
require("dotenv").config();
const port = 3000;
const app = express();

app.use(cors());
app.use(bodyParser.json()); //application json
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, UPDATE,PATCH"
  );
  res.header("Access-Control-Request-Method", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-credentials", true);
  res.header("Access-Control-Max-Age", 2592000); // 30 days

  // "Content-Type": "application/json",
  next();
});
app.get("/", (req, res, next) => {
  res.status(200).json({
    message: "ok",
  });
});
app.post("/news", async (req, res, next) => {
  const API_KEY = req.body.API_KEY;
  const URL = req.body.URL;
  const query = req.body.query;
  console.log("invoked!!");
  //   console.log({API_KEY,URL,query});
  try {
    const response = await fetch(`${URL}${query}&apiKey=${API_KEY}`);
    const data = await response.json();
    res.status(200).send(data);
  } catch (error) {
    res.status(401).send(error);
  }
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
