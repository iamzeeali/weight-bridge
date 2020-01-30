const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Transaction = require("./transaction");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const bodyParser = require("body-parser");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log("MongoDB Connected"));

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.post("/transaction", function(req, res) {
  //   console.log(req.body);
  var trans = new Transaction({
    location: req.body.location,
    driverName: req.body.driverName,
    driverGsm: req.body.driverGsm,
    primeMoverNumber: req.body.primeMoverNumber,
    trailerNumber: req.body.trailerNumber,
    trailerCapacity: req.body.trailerCapacity,
    emptyWeight: req.body.emptyWeight,
    loadedWeight: req.body.loadedWeight,
    payloadWeight: req.body.payloadWeight,
    wayBillNumber: req.body.wayBillNumber
  });
  trans.save(function(err, post) {
    if (err) return console.log(err);
    console.log("saved to database");
    res.redirect("final.html");
  });
});
