var express = require('express');
var mysql = require('mysql');
var connection = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'',
  database:'flashcards'
});
var app = express();
var bodyParser = require('body-parser');
var bcrypt = require('bcryptjs');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.post('/users/register', function(req, res) {
  if (!req.body || !req.body.username || !req.body.password) {
    return res.sendStatus(400);
  }
  var salt = bcrypt.genSaltSync(3);
  var hashedPassword = bcrypt.hashSync(req.body.password, salt);
  console.log("here It working", req.body.username, hashedPassword);

  var query = `INSERT INTO users (username, hasshed_password)
                VALUES('${req.body.username}', '${hashedPassword}')`;
                console.log(query);
  connection.query(query, function(err, result){
    if (err) return res.status(500).send(err);
  res.json(result);
console.log("DB request succeeded");
 });
});

app.post('/users/login', function(req, res) {
  if (!req.body || !req.body.username || !req.body.password) {
    return res.sendStatus(400);
  }
  var query = `SELECT * FROM users WHERE username='${req.body.username}'`;
  connection.query(query, function(err, rows){
    if (err){
      console.log("Error lookingup user");
    }
    if (rows.length != 1){
      console.log("Multiple or no user found.");
      res.sendStatus(500);
      return;
    }
    var userInDB = rows[0];
    var isPasswordCorrect = bcrypt.compareSync(req.body.password, userInDB.hasshed_password);
    if (!isPasswordCorrect){
      console.log("Failed at logging in whit bad password");
      res.sendStatus(401);
      return;
    }
    res.sendStatus(200);
  });
});


require('./flashCards.js')(app, connection);









app.listen(8889);
