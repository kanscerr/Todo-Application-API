//importing express.js, mongo model
const express = require('express');
const { resourceLimits } = require('worker_threads');
const model = require('../schema');
const router = express.Router();

//route for creating new todo
router.post('/', (req, res) => {
    const newTask = new model ({
        task : req.body.task,
        todo : req.body.todo
    });
    if(req.body.task && req.body.todo){
        newTask.save()
        res.send(newTask);
    }
    else{
        res.send({Error : "Fields empty!"})
    }
});

//route for deleting a todo
router.delete('/:task', (req, res) => {
    const deleteId = req.params.task;
    model.findOneAndDelete({task : deleteId}, (error, result) => {
        if(!result){
            res.json("Given task does not exist!");
        }
        else{
            res.send(result);
        }
    })
})

//route for updating any todo
router.put('/:task', (req, res) => {
    const taskID = req.params.task;
    model.findOneAndUpdate(
        {task : taskID},
        update = {task : taskID, todo : req.body.todo},
        (error, result) => {
        if(!result){
            res.json('No such task available!')
        }
        if(req.body.task && req.body.task != taskID){ //for keeping unique task numbers
            res.send({message : "Task number cannot be changed" + result});
        }
        else{
            res.send(update);
        } 
    })
})

//exporting router to use in index.js
module.exports = router;