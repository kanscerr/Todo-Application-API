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
    newTask.save()
    res.send(`New task added: ${req.body.todo}`);
});

//route for deleting a todo
router.delete('/:task', (req, res) => {
    const deleteId = req.params.task;
    model.findOneAndDelete({task : deleteId}, (error, result) => {
        if(!result){
            res.send("Given task does not exist!");
        }
        else{
            res.send(`You deleted task ${req.params.task} : ${result.todo}`);
        }
    })
})

//route for getting all existing todo
router.get('/', (req, res) => {
    model.find((error, result) => {
        if(result.length == 0){
            res.send("No task available");
        }
        else{
            console.log(result)
            let todoString = '';
            model.countDocuments({}).exec((err, result) => {
                if(err){
                    res.send(err);
                }
                else{
                    const num = result;
                    model.find().sort({task : 1}).exec((error, result) => {
                        if(result){
                            for(i=0; i<num;i++){
                                todoString += "Task " + result[i].task + " - " + result[i].todo + "\n"
                            }
                            res.send(todoString);
                        }
                    });
                }
            })
        }
    })
})

//route for getting user defined todo
router.get('/:task', (req, res) => {
    const taskID = req.params.task;
    model.findOne(({task : taskID}), (error, result) => {
        if(!result){
            res.send("No such task available!");
        }
        else{
            res.send(`Task ${taskID} - ${result.todo}`);
        }
    })
})

//route for updating any todo
router.put('/:task', (req, res) => {
    const taskID = req.params.task;
    model.findOneAndUpdate(
        {task : taskID},
        {todo : req.body.todo},
        (error, result) => {
        if(!result){
            res.send('No such task available!')
        }
        if(req.body.task && req.body.task != taskID){
            res.send("Task number cannot be changed. \n"+ "Task " + taskID + " updated- " + req.body.todo)
        }
        else{
            res.send("Task " + taskID + " updated- " + req.body.todo);
        }
    })
})

//exporting router to use in index.js
module.exports = router;