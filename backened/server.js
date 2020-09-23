require("rootpath")();
const express = require("express");
const fs=require('fs');
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("_helpers/jwt");
const path = require("path");
const errorHandler = require("_helpers/error-handler");
var http = require('http').createServer(app);
const morgan=require('morgan');



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
 
// setup the logger
app.use(morgan('combined', { stream: accessLogStream }))

//Public folders

 app.use("/images", express.static(__dirname + "/images"));
 app.use("/documents", express.static(__dirname + "/documents"));

// use JWT auth to secure the api
//app.use(jwt());

// api routes
app.use("/",require("./controllers/main.controller"))

// global error handler
app.use(errorHandler);
// const path = require(“path”);
app.use(express.static(path.join(__dirname, "frontend/build")))

const port =
  process.env.NODE_ENV === "production" ? process.env.PORT || 80 : 4001;
http.listen(port, function(){
  console.log(`Server is listening on ${port}`);
});