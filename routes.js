/*
this is used for database server 
author: TK Chen
*/
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const connection = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : 'czyczy133',
  database : 'senior_design',
  port     : 3306,
  connectionLimit : 10,               // this is the max number of connections before your pool starts waiting for a release
  multipleStatements : true 
});

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.post('/sms/User', function (req, res) {
    if(req.body){
        //console.log(req);
        var values = [
            [req.body.id, req.body.password, req.body.email, req.body.level, req.body.secret]
        ];
        connection.getConnection(function (err, connection) {
            if (err) throw err;
            
            connection.query('INSERT INTO User (UserID, Password, Email, Permissionlevel, Secret) VALUES ?', [values],function (error, results, fields) {
            // If some error occurs, we throw an error.
            if (error) throw error;
        
            
            });
        });
    }
  })
  app.post('/sms/Error', function (req, res) {
    if(req.body){
        //console.log(req);
        var values = [
            [0,req.body.cobotid, req.body.ip, req.body.data]
        ];
        connection.getConnection(function (err, connection) {
            if (err) throw err;
            // Executing the MySQL query (select all data from the 'users' table).
            connection.query('INSERT INTO ErrorData (CobotID, CobotIP, Stopdate) VALUES ?', [values],function (error, results, fields) {
            // If some error occurs, we throw an error.
            if (error) throw error;
        
            
            });
        });
    }
  })
  app.post('/sms/Cobot', function (req, res) {
    if(req.body){
        //console.log(req);
        var values = [
            [0,req.body.ip, req.body.unit, req.body.userid]
        ];
        connection.getConnection(function (err, connection) {
            if (err) throw err;
            
            connection.query('INSERT INTO Cobot (CobotID,CobotIP, Unitdone, UserID) VALUES ?', [values],function (error, results, fields) {
            // If some error occurs, we throw an error.
            if (error) throw error;
        
            
            });
        });
    }
  })
// Creating a GET route that returns data from the 'users' table.
app.get('/User', function (req, res) {
    // Connecting to the database.
    connection.getConnection(function (err, connection) {

    
    connection.query('SELECT * FROM User', function (error, results, fields) {
      // If some error occurs, we throw an error.
      if (error) throw error;

      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(results)
    });
  });
});
app.get('/Cobot', function (req, res) {
    // Connecting to the database.
    connection.getConnection(function (err, connection) {

    
    connection.query('SELECT * FROM Cobot', function (error, results, fields) {
      // If some error occurs, we throw an error.
      if (error) throw error;

      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(results)
    });
  });
});
app.get('/Error', function (req, res) {
    //var num = req.query.num;
    // Connecting to the database.
    //res.send(num);
    connection.getConnection(function (err, connection) {

    connection.query('SELECT * FROM ErrorData', function (error, results, fields) {
      // If some error occurs, we throw an error.
      if (error) throw error;

      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(results)
    });
  });
});


// Starting our server.
app.listen(3000, () => {
 console.log("successed\n");
});
