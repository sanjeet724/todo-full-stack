import Joi from "joi-browser";
import React, { Component } from 'react';
import InputWithLabel from '../common/inputWithLabel';
import auth from "../../services/authService";

class LoginForm extends Component {
    state = {
        props: {},
        data: {},
        errors: {}
    }

    schema = {
        username: Joi.string().min(5).max(50).required().email().label("Username"),
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

    handleLogin = (e) => {
        // to avoid re-loading the site on button-click
        e.preventDefault();

        const errors = this.validate();
        this.setState({ errors: errors || {} });
        if (errors) {
            return;
        }
        // call back-end
        this.doSubmit();
    };

    doSubmit = async () => {
        try {
            const { data } = this.state;
            await auth.login(data.username, data.password);
            // do a full re-load
            window.location = "/home";
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                const errors = { ...this.state.errors };
                errors.username = ex.response.data;
                this.setState({ errors });
            } else {
                console.error("Probably you should start the server now");
            }
        }
    };

    handleChange = (e) => {
        const property = e.target.id;
        const value = e.target.value;
        const data = this.state.data;
        data[property] = value;
        this.setState({ data });
    }

    render() {
        return (
            < div className="form-container" >
                <form className="login-form">
                    <InputWithLabel
                        type={"email"}
                        id={"username"}
                        label={"Username"}
                        placeholder={"Email"}
                        error={this.state.errors.username}
                        handleChange={this.handleChange}
                    />
                    <InputWithLabel type={"password"}
                        label={"Password"}
                        id={"password"}
                        placeholder={"Password"}
                        error={this.state.errors.password}
                        handleChange={this.handleChange}
                    />
                    <button
                        type="submit"
                        onClick={this.handleLogin}
                        className="btn btn-primary">Submit</button>
                </form>
            </div >
        );
    }
}

export default LoginForm;