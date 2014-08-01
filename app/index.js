'use strict';

var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var app = express();

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

app.use(morgan('dev'));
app.use(express.static(__dirname + '/static'));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function(req, res){
  res.render('home');
});

app.get('/calc', function(req, res){
  res.render('calc');
});

app.post('/calc', function(req, res){
  var x = req.body.x * 1;
  var y = req.body.y * 1;
  var ans;

  switch(req.body.op){
    case '+':
      ans = x + y;
      break;
    case '-':
      ans = x - y;
      break;
    case '*':
      ans = x * y;
      break;
    case '/':
      ans = x / y;
}

  res.render('calc', {x:x, y:y, op:req.body.op, ans:ans});
});

app.get('/box', function(req, res){
  res.render('box');
});

app.post('/genbox', function(req, res){
  var boxNum = req.body.a * 1;
  var colors = req.body.d.split(',');
  var height = req.body.b.split('-');
  var width = req.body.c.split('-');

  var bgColor = colors.map(function(c){return c.trim();});
  var widths = width.map(function(n){return n * 1;});
  var heights = height.map(function(n){return n * 1});
  console.log(bgColor);

  res.render('genbox', {bgColor:bgColor, widths:widths, heights:heights, boxNum:boxNum});
});

var port = process.env.PORT;

app.listen(port, function() {
  console.log('Everything is ready on port! ' + port);
});
