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

//connecting with routes
app.use('/', homeRoute, (req, res) => {
    res.sendFile(__dirname + "/public/create.html");
});
app.use('/', getTodoRoute, (req, res) => {
    res.sendFile(__dirname + "/public/get.html");
})

//listening on port
app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));