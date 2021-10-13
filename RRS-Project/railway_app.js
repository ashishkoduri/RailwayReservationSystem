const { Client } = require("pg");
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var urlencodedParser = bodyParser.urlencoded({extended : false});

var client = new Client({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "12345",
  port: "5432"
});

client.connect();

app.set('view engine', 'ejs');

app.get('/',function(req,res){
  res.sendFile(__dirname + '/home.html');
});

app.get('/adminportal',function(req,res){
  res.sendFile(__dirname + '/adminportal.html');
});

var tid=3000;
app.post('/adminportal', urlencodedParser, function(req,res){
  tid =tid+1;
  console.log(req.body);

var no = req.body.trainno;
var date = req.body.traindate;
var ac = req.body.accoach;
var sleeper = req.body.sleepercoach;
var acseats = 0;
var sleeperseats =0;
var q = "call train_release($1,$2,$3,$4,$5,$6,$7)";
var val = [tid,no,date,ac,sleeper,acseats,sleeperseats];

  client.query(q , val, function(err,result){
    if (err){
      res.send(err);
      console.log(err);
    }
  });
  client.query("select * from trains where trains.tid ="+tid, function(err,result1){
    if (err){
      res.send(err);
      console.log(err);
    }
    else if((result1.rows[0]).trainno == 1)
    res.send("please enter valid train");

    else{
      res.send("train booked successfully");
      console.log(result1);
    }

//    client.end();
  });
});



app.get('/bookingagentportal',function(req,res){
  res.sendFile(__dirname + '/bookingagentportal.html');
});

app.post('/bookingagentportal', urlencodedParser, function(req,res){
  console.log(req.body);
  var name = req.body.name;
  var cred = req.body.cred;
  var add = req.body.add;
var q = "insert into booking_agent values($1,$2,$3)";
var val = [name,cred,add];
  client.query(q,val,function(err,result){
    if(err){
      console.log(err);
    }
  });
  res.sendFile(__dirname + '/bookingportal.html');
});




app.get('/bookingportal',function(req,res){
  res.sendFile(__dirname + '/bookingportal.html');
});

var pnr = 2000;
app.post('/bookingportal', urlencodedParser, async function(req,res){
  pnr = pnr + 1;
  console.log(req.body);
  //await client.connect();
  console.log(typeof (req.body.tcoach));


var trainno = req.body.trainno;
var no_p = req.body.no_p;
var tcoach = req.body.tcoach;
var traindate = req.body.traindate;
var ps1 = req.body.ps1;
var a1 = req.body.a1;
var g1 = req.body.g1;
var ps2 = req.body.ps2;
var a2 = req.body.a2;
var g2 = req.body.g2;
var ps3 = req.body.ps3;
var a3 = req.body.a3;
var g3= req.body.g3;
var ps4 = req.body.ps4;
var a4 = req.body.a4;
var g4 = req.body.g4;
var ps5 = req.body.ps5;
var a5 = req.body.a5;
var g5 = req.body.g5;
var ps6 = req.body.ps6;
var a6 = req.body.a6;
var g6 = req.body.g6;


  const que = "call ticket_booking( $1 ,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23)";
  const values = [pnr,trainno,no_p,tcoach,traindate,ps1,a1,g1,ps2,a2,g2,ps3,a3,g3,ps4,a4,g4,ps5,a5,g5,ps6,a6,g6];
  client.query( que,values ,function(err,result1){
    if (err)
    res.send(err);
    console.log(err);
    //console.log(result1);
  });
  client.query("select * from tickets where tickets.pnr = "+pnr, function(err,result){
    if (err){
    res.send(err);
    console.log(err);
  }
    else if((result.rows[0]).trainno == 1)
    res.send("please enter valid information");
    else
    res.render('ticket', {detail: (result.rows[0])});
    console.log(result);
    //console.log((result.rows[0]).pnr);
  });
//  client.end();
});

app.listen(5000);
