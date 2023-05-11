const newrelic = require('newrelic');
var express = require('express');
var app = express();
const {execSync} = require('child_process'); // sleep

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use("/api/users", require("./routes/api/users"));

app.listen(3000, function () {
  console.log('Server started on port 3000');
});