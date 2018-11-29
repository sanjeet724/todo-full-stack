const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require("joi");
const mongoose = require("mongoose");
const _ = require('lodash');

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        trim: true,
        required: true,
        minlength: 5,
        maxlength: 1024 // password is hashed
    },
    created: {
        type: Date,
        required: false,
        default: Date.now()
    }
});

// can be used for auth and user routes
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({
        _id: this._id,
        name: _.startCase(this.name),
        email: this.email
    }, config.get('jwtPrivateKey'));

    return token;
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
    const schema = {
        name: Joi.string().min(2).max(50).required(),
        email: Joi.string().min(5).max(50).required().email(),
        password: Joi.string().min(5).max(16).required()
    };

    return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;