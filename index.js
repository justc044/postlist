const express = require('express')
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    ent = require('ent'), 
    fs = require('fs'),
    bodyParser = require('body-parser');

var path = __dirname + '/views/';

const post = require('./routes/post.route');
const db = require('./database');

app.use(express.static('resources'));
app.use(express.static('node_modules'));
app.use(express.static('modules'));
app.use(express.static('views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/post', post);

app.get('/', function (req, res) {
  res.sendfile(path + 'index.html');
});

server.listen(process.env.PORT || 5000);