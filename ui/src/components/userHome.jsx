import Joi from "joi-browser";
import React, { Component } from 'react';
import { toast } from "react-toastify";
import InputWithLabel from './common/inputWithLabel';
import CardTask from './cardTask';
import CardTaskEdit from './cardTaskEdit';
import ActionMenu from './actionMenu';
import * as taskService from '../services/taskService';

class UserHome extends Component {
    state = {
        data: {
            task: ""
        },
        editData: {
            task: {},
            editing: false
        },
        errors: {},
        allTasks: []
    };

    schema = {
        task: Joi.string().min(2).max(50).required().label("Task")
    };

    componentDidMount = async () => {
        // get the tasks for this user
        const { data } = await taskService.getAllTasks();
        let { allTasks } = this.state
        allTasks = data;
        this.setState({ allTasks });
    };

    handleChange = (e) => {
        const { data } = this.state;
        data.task = e.currentTarget.value;
        this.setState({ data });
    };

    validate = () => {
        const { error } = Joi.validate(this.state.data, this.schema);
        if (!error) {
            return null;
        }
        const validationErrors = {};
        for (let item of error.details) {
            validationErrors[item.path[0]] = item.message;
        }
        return validationErrors;
    };

    addTask = (e) => {
        e.preventDefault();

        const error = this.validate();
        this.setState({ errors: error || {} });
        if (error) {
            return;
        }

        this.doSubmitNewTask();
    };

    updateStateAfterNewTask = (newTask) => {
        toast.success("Task created");
        const { data, allTasks } = this.state;
        data.task = "";
        this.setState(data);
        // add it to all tasks
        allTasks.unshift(newTask);
        this.setState({ allTasks });
    };

    doSubmitNewTask = async () => {
        try {
            const taskPayload = {
                title: this.state.data.task
            }
            const { data: newTask } = await taskService.createTask(taskPayload);
            this.updateStateAfterNewTask(newTask);
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                const errors = { ...this.state.errors };
                errors.username = ex.response.data;
                this.setState({ errors });
            }
        }
    };

    updateStateAfterTaskComplete = (completedTask) => {
        toast.success("Task status updated")
        const { allTasks } = this.state;
        let task = allTasks.find(t => t._id === completedTask._id);
        task.status = completedTask.status;
        this.setState({ allTasks });
    };

    // lets use old school promised for this one
    handleTaskCompleted = (task) => {
        const promise = taskService.completeTask(task._id);
        promise.then(succ => {
            this.updateStateAfterTaskComplete(succ.data);
        }).catch(err => {
            toast.error("Oops, something went wrong");
        });
    };

    updateStateAfterTaskRemove = (task) => {
        toast.success("Task removed")
        const { allTasks } = this.state;
        const index = allTasks.findIndex(t => t._id === task._id);
        // remove 1 element from index 
        allTasks.splice(index, 1);
        this.setState({ allTasks });
    };

    handleTaskDeleted = async (task) => {
        try {
            await taskService.removeTask(task._id);
            this.updateStateAfterTaskRemove(task);
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                const errors = { ...this.state.errors };
                errors.username = ex.response.data;
                this.setState({ errors });
            }
            toast.error("Oops, something went wrong");
        }
    };

    handleSort = (type) => {
        const { allTasks } = this.state;
        allTasks.sort((a, b) => {
            if (type === "status") {
                // boolean sort (true should come first)
                return b[type].completed - a[type].completed;
            } else {
                return a[type] > b[type] ? 1 : -1;
            }
        });
        this.setState(allTasks);
        toast.info("Tasks sorted");
    };

    handleTaskEdited = (task) => {
        let { editData } = this.state;
        editData.task = task;
        editData.editing = true;
        this.setState({ editData });
    };

    validateEdit = (editParams) => {
        const schema = {
            newTitle: Joi.string().min(2).max(50).required().label("Title")
        };

        const { error } = Joi.validate(editParams, schema);
        if (!error) {
            return null;
        }
        const validationErrors = {};
        for (let item of error.details) {
            validationErrors[item.path[0]] = item.message;
        }
        return validationErrors;
    };

    handleEditSubmit = (updateParams) => {
        let { title } = updateParams;

        const error = this.validateEdit({ newTitle: title });
        this.setState({ errors: error || {} });
        if (error) {
            return
        }

        this.submitChanges(updateParams);
    };

    submitChanges = async (updateParams) => {
        // pessimistic update
        try {
            await taskService.changeTask(updateParams);
            this.updateStateAfterTaskEdit(updateParams);
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                const errors = { ...this.state.errors };
                errors.username = ex.response.data;
                this.setState({ errors });
            }
            toast.error("Oops, something went wrong");
        }
    };

    updateStateAfterTaskEdit = (updateParams) => {
        const { allTasks, editData } = this.state;
        const { title, category, task: newTask } = updateParams;
        let task = allTasks.find(t => t._id === newTask._id);
        task.title = title;
        task.category = category;
        this.setState({ allTasks });
        toast.success("Task details updated");

        // update editing logic
        editData.task = {};
        editData.editing = false;
        this.setState({ editData });
    };

    handleCancelEdit = (updateParams) => {
        let { editData, errors } = this.state;
        editData.task = {};
        editData.editing = false;
        this.setState({ editData });
        toast.warning("Task updates cancelled");

        // clear any validation errors
        errors = {};
        this.setState({ errors });
    };

    render() {
        const { allTasks, data, errors, editData } = this.state;
        const taskText = allTasks.length > 1 ? "Tasks" : "Task";
        const editing = editData.editing;
        const badgeClasses = "badge badge-pill badge-secondary task-badge";
        return (
            <React.Fragment>
                <div className="task-menu-container">
                    <h4><span className={badgeClasses}>{allTasks.length} {taskText}</span></h4>
                    <ActionMenu onSort={this.handleSort} disabled={editing} />
                </div>
                <div className="task-add">
                    <InputWithLabel
                        type={"text"}
                        id={"task"}
                        label={"Add something..."}
                        handleChange={this.handleChange}
                        error={errors.task}
                        placeholder={"What did you want to do today?"}
                        value={data.task}
                        disabled={editing}
                    />
                    <button
                        type="submit"
                        onClick={this.addTask}
                        disabled={editing}
                        className="btn btn-primary">Create
                </button>
                </div>
                <div className="task-list-container">
                    {!editing &&
                        allTasks.map((task, index) => (
                            <CardTask
                                key={index + 1}
                                task={task}
                                taskCompleted={this.handleTaskCompleted}
                                taskDeleted={this.handleTaskDeleted}
                                taskEdited={this.handleTaskEdited}
                            />
                        ))
                    }
                    {
                        editing && <CardTaskEdit
                            cardData={editData}
                            errors={errors}
                            finishEditing={this.handleEditSubmit}
                            cancelEditing={this.handleCancelEdit}
                        />
                    }
                </div>
            </React.Fragment >
        );
    }
}

export default UserHome;