  app.get('/flashcard', function(req, res){
    connection.query('SELECT * FROM flashcard', function(err, rows){
      if (err) {
        console.log("Error read flash card");
        return res.sendStatus(500);
      }
      res.json(rows);
    });
  });

  app.post('/flashcard', function(req, res){
    var query = `INSERT INTO flashcard (front_text, back_text, owner, subject)
    VALUES ('${req.body.front_text}', '${req.body.back_text}', '${req.body.owner}', '${req.body.subject}')`;
    connection.query(query, function(err, result){
      if (err) {
        console.log("Error writing flash card: " + err.toString());
        return res.sendStatus(500);
      }
      res.json(result);
    });
  });

  app.put('/flashcard', function(req, res){
    var cartman = `UPDATE flashcard set front_text='${req.body.front_text}',
    back_text='${req.body.back_text}', id='${req.body.id}', subject='${req.body.subject}'`;
    connection.query(cartman, function(err, result){
      if (err) {
        console.log("Error updating flash with id: " + req.body.id);
        console.log(err.toString());
        return res.sendStatus(500);
      }
      res.json(result);
    });
  });



  module.exports = function(app, connection)
