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
app.use(express.json());         // to support JSON-encoded bodies
// app.use(express.urlencoded());   // to support URL-encoded bodies
app.get('/', function (req, res) {
  con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM scores ORDER BY value DESC", function (err, result, fields) {
    res.send(result);
  });

  // con.query("SELECT COUNT(*) FROM scores", function (err, result, fields) {
  //   res.send(result);
  // });

});
});

app.post('/', function(req, res){
  var name = req.body.name,
      value = req.body.value;
      id = req.body.id;
  if (err) throw err;
  con.query("SELECT COUNT(*) FROM scores", function (err, result, fields) {
    if((result[0][0] == 10) && (id == 0)){ // result of COUNT(*)
      res.send(0);
    }
    else{
      if(id!=0){
        con.query("UPDATE scores SET name = " + name + ", value = " + value + "WHERE id = " + id, function (err, result, fields) {
          if (err) throw err;
          console.log("1 record updated");
        });
      }
      else{
        con.query("INSERT INTO scores (name, value) VALUES ('"+ name + "', '" + value + "')", function (err, result, fields) {
          if (err) throw err;
          console.log("1 record inserted");
        });
      }
    }
  });
});

app.listen(port, "0.0.0.0", function() {
  console.log("Listening on Port " + port );
  });
  

