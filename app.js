var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');

var app = express();

var port = process.env.PORT || 3000;

var con = mysql.createConnection({
  host: "*******zybll9lrm.chr7pe7iynqr.eu-west-1.rds.amazonaws.com",
  user: "**********",
  password: "**********",
  database: "**********"
});

app.use(bodyParser.json());  // to support JSON-encoded bodies

app.get('/', function (req, res) {
  con.query("SELECT * FROM scores ORDER BY value DESC", function (err, result, fields) {
    if (err) throw err;
    res.send(result);
  });

  // con.query("SELECT COUNT(*) FROM scores", function (err, result, fields) {
  //   res.send(result);
  // });

});
// function retrieve(result){
//   qResult = result;
// }
app.post('/', function(req, res){
  var name = req.body.name,
      value = req.body.value;
      id = req.body.id;
  console.log(name +" " + value + " " + id);
  con.query("SELECT COUNT(*) FROM scores", function (err, result, fields) {
    if (err) throw err;
    if((result[0]["COUNT(*)"] == 10) && (id == 0)){ // result of COUNT(*)
      res.sendStatus(423);
    }
    else{
      if(id!=0){
        con.query(`UPDATE scores SET name = "${name}", value = ${value} WHERE id = ${id}`, function (err, result, fields) {
          if (err) throw err;
          res.sendStatus(200);
          console.log("1 record updated");
        });
      }
      else{
        con.query("INSERT INTO scores (name, value) VALUES ('"+ name + "', '" + value + "')", function (err, result, fields) {
          if (err) throw err;
          res.sendStatus(200);
          console.log("1 record inserted");
        });
      }
    }
  });
});

app.listen(port, "0.0.0.0", function() {
  console.log("Listening on Port " + port );
  });
  

