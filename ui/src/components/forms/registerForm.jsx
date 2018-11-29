import Joi from "joi-browser";
import React, { Component } from 'react';
import InputWithLabel from '../common/inputWithLabel';
import * as userService from "../../services/userService";
import auth from "../../services/authService";

class RegisterForm extends Component {
    state = {
        props: {},
        data: {},
        errors: {}
    };

    schema = {
        name: Joi.string().min(5).max(50).required(),
        username: Joi.string().min(5).max(50).required().email().label("email"),
        password: Joi.string().min(5).max(16).required().label("Password")
    };

    constructor(props) {
        super(props);
        this.state.props = props;
    };

    validate = () => {
        const options = { abortEarly: false };
        const { error } = Joi.validate(this.state.data, this.schema, options);
        if (!error) {
            return null;
        }
        const validationErrors = {};
        for (let item of error.details) {
            validationErrors[item.path[0]] = item.message;
        }
        return validationErrors;
    };

    handleRegistration = (e) => {
        // to avoid re-loading the site on button-click
        e.preventDefault();

        const errors = this.validate();
        this.setState({ errors: errors || {} });
        if (errors) {
            console.log(errors);
            return;
        }
        // call back-end
        this.doSubmit();
    };

    doSubmit = async () => {
        try {
            const response = await userService.register(this.state.data);
            auth.loginWithJwt(response.headers["x-auth-token"]);
            // do a full re-load
            window.location = "/home";
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                const errors = { ...this.state.errors };
                errors.username = ex.response.data;
                this.setState({ errors });
            }
        }
    };

    handleChange = (e) => {
        const property = e.target.id;
        const value = e.target.value;
        const data = this.state.data;
        data[property] = value;
        this.setState({ data });
    };

    render() {
        return (
            <div className="form-container">
                <form className="login-form">
                    <InputWithLabel
                        type={"text"}
                        id={"name"}
                        label={"Name"}
                        placeholder={"Enter name"}
                        error={this.state.errors.name}
                        handleChange={this.handleChange}
                    />
                    <InputWithLabel
                        type={"email"}
                        id={"username"}
                        label={"Username"}
                        placeholder={"Enter email"}
                        error={this.state.errors.username}
                        handleChange={this.handleChange}
                    />
                    <InputWithLabel
                        type={"password"}
                        id={"password"}
                        label={"Password"}
                        placeholder={"Password"}
                        error={this.state.errors.password}
                        handleChange={this.handleChange}
                    />
                    <button
                        type="submit"
                        onClick={this.handleRegistration}
                        className="btn btn-primary">Register</button>
                </form>
            </div>
        );
    }
}

export default RegisterForm;

