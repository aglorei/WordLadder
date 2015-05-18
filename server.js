var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();

app.use(express.static(path.join(__dirname,'client')));
app.use(bodyParser.json());

var server = app.listen(8000, function(){
	console.log('listening to port 8000');
});