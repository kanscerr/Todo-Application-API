//importing mongoose
const mongoose = require('mongoose');

//creating schema for our db
const schema = new mongoose.Schema({
    message : String,
    task : Number,
    todo : String
});

//creating model with 'list' as collection name
const model = mongoose.model('list', schema);

//exporting model
module.exports = model;