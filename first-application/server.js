var express = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser");

var admin = require("firebase-admin");

//This account is no longer valid
var serviceAccount = require("./quiver-two-8a524-firebase-adminsdk-v74fq-6d37d62cb9.json");

var firebaseAdmin = admin.initializeApp({
  //cert means certify here
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://quiver-two-8a524.firebaseio.com"
});

var database = firebaseAdmin.database()

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

app.get("/", function (req, res) {
  var restaurantsRef = database.ref("/restaurants")

  restaurantsRef.once("value", function (snapshot) {
    console.log(snapshot.val())
    var data = snapshot.val()

    if (!data) {
      data = {}
    }

    res.render("home.ejs", { restaurants: data });
  })
});

app.get("/profile/:userId", function (request, response) {
  var userId = req.params.userId

  var user = firebaseAdmin.getAllUsersData(userId)

  response.render("profile.ejs", { user: user })

});


// app.post("/", function (req, res) {
//   var breakfast = req.body.breakfast;
//   res.render("results.ejs", { data: breakfast });
// });
var port = process.env.PORT || 8080;
app.listen(port, function () {
  console.log("App runnning on port " + port);
});
