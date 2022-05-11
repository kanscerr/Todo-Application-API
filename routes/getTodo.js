//importing express.js, mongo model
const express = require('express');
const { resourceLimits } = require('worker_threads');
const model = require('../schema');
const router = express.Router();


//route for getting all existing todo
router.post('/getTodo', (req, res) => {
    model.find((error, result) => {
        if(result.length == 0){
            res.send("No task available");
        }
        else{
            model.find().sort({task : 1}).exec((error, result) => {
                if(error){
                    res.send({message: error});
                }
                else{
                    res.send(result)
                }
            });
        }
    })
})

//route for getting user defined todo
router.post('/getTodo/:task', (req, res) => {
    const taskID = req.params.task;
    model.findOne(({task : taskID}), (error, result) => {
        if(!result){
            res.json("No such task available!");
        }
        else{
            res.send(result);
        }
    })
})

//exporting router to use in index.js
module.exports = router;