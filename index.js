//importing express.js, mongoose.js, parser, mongo model, routes
const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const model = require('./schema');
const homeRoute = require('./routes/home')
const getTodoRoute = require('./routes/getTodo')

//connecting with mongodb compass locally
mongoose.connect("mongodb://localhost/todolist", {useNewUrlParser: true}, () => console.log('Connected with database!'))

const app = express();
const PORT = 5000;

//middleware for reading from request body
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

//connecting with routes
app.use('/', homeRoute);
app.get('/', (req, res) => {
    res.sendFile('/public/create.html', {root : __dirname});
});
app.get('/home', (req, res) => {
    res.sendFile('/public/create.html', {root : __dirname});
});

app.get('/getTodo', (req, res) => {
    res.render('get', {todo : result});
});
//listening on port
app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));