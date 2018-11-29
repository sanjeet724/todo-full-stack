import React from 'react';
import EditIcon from './common/editIcon';
import DoneIcon from './common/doneIcon';
import CardButton from './common/cardButton';

// css defaults
let cardCss;
let cardBodyCss;
let disabled;
let doneBtnCss;
let doneDtnTxt;
let deleteBtnCss;
let deleteButtonTxt;

const setCSSDefaults = () => {
    cardCss = "card card-task bg-light";
    cardBodyCss = "card-body text-primary";
    disabled = false;
    doneBtnCss = "btn btn-sm";
    doneDtnTxt = "Finish";
    deleteBtnCss = "btn btn-outline-danger btn-sm";
    deleteButtonTxt = "Delete";
};

const getUpdatedCss = (isCompleted, editMode) => {
    cardCss = isCompleted ? cardCss + " border-success" : cardCss + " border-primary";
    cardCss = editMode ? cardCss + " border-warning" : cardCss;
    cardBodyCss = isCompleted ? cardBodyCss + " text-success" : cardBodyCss;
    cardBodyCss = editMode ? cardBodyCss + " text-secondary" : cardBodyCss;
    disabled = isCompleted || editMode ? true : false;
    doneBtnCss = isCompleted ? doneBtnCss + " btn-outline-success" : doneBtnCss + " btn-outline-primary";
    doneDtnTxt = isCompleted ? "Done" : doneDtnTxt;
};

const CardTask = (props) => {
    const { task, taskCompleted, taskDeleted, taskEdited } = props;
    const { title, status, category, editMode } = task;
    const isCompleted = status.completed;
    setCSSDefaults();
    getUpdatedCss(isCompleted, editMode);
    return (
        <div className={cardCss}>
            <div className={cardBodyCss}>
                <div className="card-title-container">
                    <h5 className="card-title" title={title}>{title}</h5>
                    {!isCompleted && <EditIcon tooltip={"Edit task"} handleClick={taskEdited} target={task} />}
                    {isCompleted && <DoneIcon tooltip={"Task completed"} />}
                </div>
                <h6 className="card-subtitle mb-2  badge badge-secondary">{category}</h6>
                <p className="card-text">{status.completed ? "Yay, its done" : "Not finished yet"}</p>
                <div className="card-btn-group">
                    <CardButton
                        cssClasses={doneBtnCss}
                        target={task}
                        disabled={disabled}
                        label={doneDtnTxt}
                        handleClick={taskCompleted}
                    />
                    <CardButton
                        cssClasses={deleteBtnCss}
                        target={task}
                        disabled={editMode ? true : false}
                        label={deleteButtonTxt}
                        handleClick={taskDeleted}
                    />
                </div>
            </div>
        </div >
    );
}

export default CardTask;