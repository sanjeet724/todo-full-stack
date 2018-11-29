import React, { Component } from 'react';
import CardTitleEdit from './common/cardTitleEdit';
import CardCategoryEdit from './common/cardCategoryEdit';
import CardButton from './common/cardButton';

class CardTaskEdit extends Component {
    state = {
        title: "",
        category: "",
        task: {},
    };

    componentDidMount = () => {
        const task = this.props.cardData.task || {};
        this.setState({ task });

        // default-category
        const category = task.category;
        this.setState({ category });
    }

    handleTitleChange = (newTitle) => {
        let { title } = this.state;
        title = newTitle;
        this.setState({ title });
    };

    handleCategoryChange = (newCategory) => {
        let { category } = this.state;
        category = newCategory;
        this.setState({ category });
    };

    render() {
        const { cardData, errors, finishEditing, cancelEditing } = this.props;
        const { task } = cardData;
        const styles = {
            margin: "auto",
            width: "75%"
        };
        const target = { ...this.state };
        return (
            <div className="card bg-light border-secondary" style={styles}>
                <div className="card-body text-dark">
                    <h5 className="card-title">Editing <span className="text-muted">{task.title}</span></h5>
                    <CardTitleEdit
                        titleChanged={this.handleTitleChange}
                        titleError={errors.newTitle}
                        placeholder={task.title}
                    />
                    <CardCategoryEdit
                        defaultCategory={task.category}
                        categoryChanged={this.handleCategoryChange}
                    />
                    <div className="edit-btn-group">
                        <CardButton
                            className="edit-btn-done"
                            cssClasses={"btn btn-primary"}
                            target={target}
                            disabled={false}
                            label={"Submit"}
                            handleClick={finishEditing}
                        />
                        <CardButton
                            cssClasses={"btn btn-primary edit-cancel-btn"}
                            disabled={false}
                            target={target}
                            label={"Cancel"}
                            handleClick={cancelEditing}
                        />
                    </div>
                </div>
            </div>

        );
    }
}

export default CardTaskEdit; 