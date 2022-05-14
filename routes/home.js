//importing express.js, mongo model
const express = require('express');
const model = require('../schema');
const router = express.Router();

//main route
router.post('/home', (req,res) => {
    res.sendFile(__dirname, "/create.html");
})

//route for creating new todo
router.post('/home', (req, res) => {
    const newTask = new model ({
        task : req.body.task,
        todo : req.body.todo
    });
    newTask.save(newTask)
    .then(item => {
        res.send("Done!");
    })
    .catch(err => {
        res.status(400).send("Unable to save to database");
    });
});

//route for deleting a todo
router.delete('/home/:task', (req, res) => {
    const deleteId = req.params.task;
    model.findOneAndDelete({task : deleteId}, (error, result) => {
        if(!result){
            res.json({Error : "Given task does not exist!"});
        }
        else{
            res.send(result);
        }
    })
})

//route for updating any todo
router.put('/home/:task', (req, res) => {
    const taskID = req.params.task;
    model.findOneAndUpdate(
        {task : taskID},
        update = {task : taskID, todo : req.body.todo},
        (error, result) => {
        if(!result){
            res.json({Error : 'No such task available!'})
        }
        if(req.body.task && req.body.task != taskID){ //for keeping unique task numbers
            update = {message : "Cannot change Task number", task : taskID, todo : req.body.todo}
            res.send(update);
        }
        else{
            res.send(update);
        } 
    })
})

//exporting router to use in index.js
module.exports = router;