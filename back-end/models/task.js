const Joi = require("joi");
Joi.objectId = require('joi-objectid')(Joi);

const mongoose = require("mongoose");
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
        trim: true,
    },
    status: {
        completed: {
            type: Boolean,
            default: false
        },
        completedon: {
            type: Date
        }
    },
    category: {
        type: String,
        enum: ['Shopping', 'General', 'Work', 'Home', 'Personal', 'Interview'],
        default: 'General'
    },
    user: {
        type: new mongoose.Schema({
            _id: {
                type: String,
                required: true
            }
        }),
        required: true
    },
    addedon: {
        type: Date,
        default: Date.now()
    }
}, { timestamps: true });

function validateNewTask(task) {
    const schema = {
        title: Joi.string().min(2).max(50).required()
    };

    return Joi.validate(task, schema);
}

const Task = mongoose.model("Task", taskSchema);

exports.Task = Task;
exports.validate = validateNewTask;