var express = require('express');
var app = express();
var rooms = require('./data/rooms.json');
var bodyParser = require('body-parser');
var uuid = require('node-uuid');
var _ = require('lodash');
 
app.set('views', './views'); 
app.set('view engine', 'jade'); 
app.set('port',process.env.PORT || 3000 );
 
app.use(express.static(__dirname + '/public'));
app.use(express.static('node_modules/bootstrap/dist'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res){
    res.render('rooms', { 
        title: "Rooms",
        rooms: rooms });
});

app.get('/admin/rooms', function(req, res){
    res.render('rooms', { 
        title: "Admin Rooms",
        rooms: rooms });
});

app.get('/admin/rooms/add', function(req, res){
    res.render('add');
});  

app.post('/admin/rooms/add', function(req, res){
    var room = {
    	name: req.body.name, 	// req.body: Object  req.body.name:'dogs'
    	id: uuid.v4()			// function v4(options, buf, offset)
    };							// rooms: Array[5]
    rooms.push(room);
    // res.json(room);
    res.redirect('/admin/rooms');
});  

app.get('/admin/rooms/delete/:id', function(req, res){
	var roomId = req.params.id;
	rooms = rooms.filter(r => r.id !== roomId);
    res.redirect('/admin/rooms');
})

app.get('/admin/rooms/edit/:id', function(req, res){
	var roomId = req.params.id;
	var room = _.find(rooms, r => r.id === roomId);
    res.render('edit', {room} );
})

app.post('/admin/rooms/edit/:id', function(req, res){
	var roomId = req.params.id;
	var room = _.find(rooms, r => r.id === roomId);
	room.name = req.body.name;
    res.redirect('/admin/rooms');
})
 
app.listen(app.get('port'), function(){
  console.log('Server is on' + ' ' + app.get('port') + '..');
});






// npm v node-uuid
// npm repo uuid
//