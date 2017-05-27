var express = require('express');
var moment = require("moment");
var path = require("path");

var app = express();

function isDate(value){
  if (+value > 0 || value === moment(value).format('MMMM D, YYYY')){
    return true;
  } else {
    return false;
  }
}

function isUnix(time){
  if (+time){
    return true;
  } else {
    
    return false;
  }
}

function isNatural (time){
  if (moment.isMoment(moment(time))) {
    return true;
  } else {
    return false;
  }
}

function unixToNatural(time){
  var result = {};
  result.unix = time;
  result.natural = moment.unix(+time).format('MMMM D, YYYY');
  return result;
}

function naturalToUnix(time){
  var result = {};
  result.unix = moment(time).unix();
  result.natural = moment(time).format('MMMM D, YYYY');
  return result;
}


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/:query', function (req, res) {
  var recievedDate = req.params.query;
  var outputObj = {};
  if (isDate(recievedDate)) {
    if (isUnix(recievedDate)){
      outputObj = unixToNatural(recievedDate);
      res.send(outputObj);
    } else if (isNatural(recievedDate)){
      outputObj = naturalToUnix(recievedDate);
      res.send(outputObj);
    } 
  } else {
    outputObj = {
      unix: null,
      natural: null
    };
    res.send(outputObj);
    console.log('result is sent to screen');
  }
});

app.listen(8080, function () {
  console.log('Timestamp app listening on port 8080!');
});