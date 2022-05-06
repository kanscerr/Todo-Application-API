//importing express.js, mongo model
const express = require('express');
const model = require('../schema');
const router = express.Router();

//route for creating new todo
router.post('/', (req, res) => {
    const newTask = new model ({
        task : req.body.task,
        todo : req.body.todo
    });
    newTask.save()
    res.send(newTask);
});

//route for deleting a todo
router.delete('/:task', (req, res) => {
    const deleteId = req.params.task;
    model.findOneAndDelete({task : deleteId}, (error, result) => {
        if(!result){
            res.send("Given task does not exist in database!");
        }
        else{
            res.send(`Deleted: ${result}`);
        }
    })
})

//route for getting all existing todo
router.get('/', (req, res) => {
    model.find((error, result) => {
        if(!result){
            res.send("No task available in database!");
        }
        else{
            res.send(result);
        }
    })
})

//route for getting user defined todo
router.get('/:task', (req, res) => {
    const taskID = req.params.task;
    model.findOne(({task : taskID}), (error, result) => {
        if(!result){
            res.send("No such task available in database!");
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
        {task : req.body.task, todo : req.body.todo},
        (error, result) => {
        if(!result){
            res.send('No such task available in database!')
        }
        else{
            res.send(`Task ${taskID} updated to: ${JSON.stringify(req.body)}`)
        }
    })
})

//exporting router to use in index.js
module.exports = router;