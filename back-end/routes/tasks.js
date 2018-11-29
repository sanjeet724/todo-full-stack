const _ = require('lodash');
const auth = require('../middleware/auth')
const express = require("express");
const router = express.Router();

const { Task, validate } = require('../models/task');
const { User } = require('../models/user');

// get all the tasks of the current user
router.get('/', [auth], async (req, res) => {
    // we don't need any validation as we are just retrieving the tasks
    // the auth middle ware adds the user object to the req after successful authentication
    const tasks = await Task.find({
        user: req.user
    }).sort({
        createdAt: -1
    });

    res.send(tasks);
});

// create a new task for the current user
router.post('/', [auth], async (req, res) => {
    const { error } = validate(req.body);
    // JOI validation
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    // validate the user 
    const user = await User.findById(req.user._id);
    if (!user) {
        return res.status(400).send("Inavlid user");
    }

    // create a new task
    const taskObject = {
        title: req.body.title,
        user: {
            _id: user._id
        }
    };
    // category is optional
    if (req.body.category) {
        taskObject.category = req.body.category
    }

    const task = new Task(taskObject);

    await task.save();
    res.send(task);
});

// update a task for the current user
router.put('/:id', [auth], async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.send(task);
    } catch (ex) {
        return res.status(404).send("Task not found");
    }
});

// delete  a task for the current user
router.delete('/:id', [auth], async (req, res) => {
    try {
        await Task.findByIdAndDelete({
            _id: req.params.id
        });
        res.send("Task deleted");
    } catch (ex) {
        return res.status(404).send("Task not found");
    }
});

module.exports = router;