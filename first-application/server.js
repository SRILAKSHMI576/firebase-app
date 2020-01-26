var express = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser");

var admin = require("firebase-admin");

var serviceAccount = require("");

var firebaseAdmin = admin.initializeApp({
  //cert means certify here
  credential: admin.credential.cert(serviceAccount),
  databaseURL: ""
});
//create instance of express app
var app = express();

// we want to serve js and html in ejs
// ejs stands for embedded js
app.set("view engine", "ejs");

// we also want to send css, images, and other static files
app.use(express.static("views"));
app.set("views", __dirname + "/views");

//give the server access to the user input
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(logger("dev"));

//create authentication middleware
function isAuthenticated(request, response, next) {
  //check user is logged in
  //if they are, attach them to the request object and call next
  // if they are not, send them to the login page
  // with  a message saying : "login!"
}

app.get("/", function(req, res) {
  res.render("home.ejs");
});

app.get("/homecoming-queen", isAuthenticated, function(request, response) {
  response.render("homecomingQueen.ejs");
});
app.post("/", function(req, res) {
  var breakfast = req.body.breakfast;
  res.render("results.ejs", { data: breakfast });
});
var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log("App runnning on port " + port);
});
