const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({path: "./config.env"});
const port = process.env.PORT || 5000;
app.use(cors);
app.use(express.json());
//https://github.com/mongodb-developer/mern-stack-example/blob/main/mern/server/db/conn.js
//https://www.mongodb.com/languages/mern-stack-tutorial