var mysql = require('mysql');
var express = require('express');
var app = express();

var port = process.env.PORT || 3000;

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "u615qyjzybll9lrm.chr7pe7iynqr.eu-west-1.rds.amazonaws.com",
  user: "iyvj67ll5omfb7dy",
  password: "pedbphao75mx0qu5",
  database: "cyjd3gv7n57trq48"
});

app.get('/', function (req, res) {
  con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT name, address FROM customers", function (err, result, fields) {
    if (err) throw err;
    res.send(fields);
  });
});
});

app.listen(port, "0.0.0.0", function() {
  console.log("Listening on Port 3000");
  });
  

