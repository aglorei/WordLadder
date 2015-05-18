var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();

app.use(express.static(path.join(__dirname,'client')));
app.use(bodyParser.json());

var port = process.env.PORT || 5000;

var server = app.listen(port, function(){
	console.log('listening to port ' + port);
});