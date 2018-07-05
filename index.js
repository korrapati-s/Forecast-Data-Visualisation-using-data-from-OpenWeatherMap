var express = require("express");
var app     = express();
var path    = require("path");
var fs = require('fs');
var cons = require('consolidate');
var ejs = require('ejs');
var bparser = require('body-parser');
var os = require('os');
var Converter  = require("csvtojson").Converter;

app.use(bparser.json());
app.use(bparser.urlencoded({ extended: true }));

var fileStream = fs.createReadStream("daily.csv");
var jsonData;
//new converter instance
var converter = new Converter({constructResult:true,noheader:false});

//end_parsed will be emitted once parsing finished
converter.on("end_parsed", function (jsonObj) {
    jsonData = jsonObj
});
fileStream.pipe(converter);

//assign ejs engine to .ejs files
app.engine('ejs', cons.ejs);

//set default ext .ejs
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');


//set public folder
app.use(express.static(path.join(__dirname, 'public')));


app.get("/",(req,res) => {
    res.render('index');
});

app.get("/historical",(req,res) => {
   res.json(jsonData);
});

app.get("/owm",(req,res) => {
   res.sendStatus(200);
});


app.get("/historicalget/", (req,res) => {
  var data = req.query.input;
  var result; console.log(data);
  if(!isNaN(data)) {

      for (var i=0; i < jsonData.length; i++) {
        if(jsonData[i] == undefined) {
              result = "Record already Deleted";
            }
        else if(jsonData[i].DATE == data) {
          result = jsonData[i];
          break;
        }

        else {
          result =  "404 Not Found";
        }
      }
  }
  res.send(result);
});

app.get("/insert" , (req, res) => {
  var date = req.query.date;
  var tmax = req.query.tmax;
  var tmin = req.query.tmin;
  var data = "{\"DATE\": \"" + date + "\",\"TMAX\": \"" + tmax + "\",\"TMIN\": \"" + tmin + "\"}";
  jsonData.push(JSON.parse(data));
    result = "Record added";
  res.send(result);
});

app.get("/historicaldel", (req,res) => {
  var data = req.query.input;
  for (var i=0; i < jsonData.length; i++) {
    if(jsonData[i]== undefined) {
      result = "Date has been already deleted, Please try another date";
    }
       else if(jsonData[i].DATE == data) {
          delete jsonData[i];
          result = "Record Deleted";
          break;
        }
        else {
          result =  "Record not found";
        }
      }
    res.send(result);
});

app.get("/forecast/", (req,res) => {
  var date = req.query.data;
  var result = [];
  var diff,dat,dat2;var i=0,j=0;
  dat = date.split("");console.log(dat);
   dat[0] = '2';dat[1] = '0';dat[2] = '1'; dat[3] = '5';console.log(dat);
   dat = dat.join("");
   diff = (date - dat);
   for ( var k=0; k< jsonData.length; k++) {
     if(jsonData[k].DATE == dat) {
       for(j=0; j<7; j++) {
       // while (j<7) {
         result[j] = jsonData[k+j];console.log(j);
         result[j].DATE = parseInt(result[j].DATE) + diff;
         // j++;
       }
       // break;
     }
  }
  res.send(result);
});


app.listen(3000);
console.log("Running at Port 3000");
