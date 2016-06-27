var express = require('express');
var bodyParser = require('body-parser');
var db = require('./models/db.js');
var routes = require('./routes/routes.js');

var app = express();

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.get('/', function(req,res) {
  res.sendFile('public/index.html');
});

app.get('/submit', function(req, res) {
  res.sendFile("public/gifSub.html");
});

app.get('/gif', routes.getGifs)
app.post('/gif', routes.addGIF);

var port = process.env.PORT || 5000; //set to environment PORT or 5000

var server = app.listen(port, function (req, res) {
  var host = server.address().address;
  console.log("app listening at http://%s:%s", host, port);
});