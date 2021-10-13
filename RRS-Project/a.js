const express = require("express");
const { Client } = require("pg");
var bodyParser = require('body-parser');

var client = new Client({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "12345",
  port: "5432"
});

var app = express();
var urlencodedParser = bodyParser.urlencoded({extended : false});

//var pnr = 1;
// async function ab(){
// client.connect();
// await client.query("stored(" + pnr + ")",function(err,res){
//   console.log("done");
// });
// client.end();
// }
// ab();

app.get('/bookingportal',function(req,res){
  res.sendFile(__dirname + '/bookingportal.html');
});

app.post('/bookingportal', urlencodedParser, function(req,res){
  console.log(req.body);
  res.send("ticket booked");
//client.connect();
// client.query("call stored("+pnr+")",function(err, result){
//   if(err) throw err;
//     pnr = Object.values(result.rows[0])[0];
//     // pnr = result.rows[val];
//     cd()
//      console.log(pnr);
     //client.end();
});


app.listen(5000);
