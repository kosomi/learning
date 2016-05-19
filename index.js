var express = require('express');
var app = express();
var rooms = require('./data/rooms.json')
var bodyParse = require('body-parser');

app.set('views', './views');
app.set('view engine', 'jade');


app.use(express.static(__dirname + '/public'));
app.use(express.static('node_modules/bootstrap/dist'));
app.use(bodyParse.urlencoded({ extended: true }));

app.get('/', function(req, res){
	res.render('rooms', {
		title: 'ddd',
		rooms: rooms
	})
}) 

var adminRouter = require("./admin");
app.use("/admin", adminRouter);

app.listen(3000, function(){
	console.log('ddd')
})