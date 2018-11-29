// use bcrypt to hash user passwords
const bcrypt = require("bcrypt");
const Joi = require("joi");
const { User } = require("../models/user");
const express = require("express");
const router = express.Router();

router.post('/', async (req, res) => {
    const { error } = validate(req.body);

    // initial validation using JOI
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    // findOne returns a promise
    let user = await User.findOne({
        email: req.body.email
    });

    // validate if email exists
    if (!user) {
        return res.status(400).send("Invalid email or password");
    }
    // validate with the hashed password stored in DB
    const validPassword = await bcrypt.compare(req.body.password, user.password);

    if (!validPassword) {
        return res.status(400).send("Invalid email or password");
    }
    // set jwt
    const token = user.generateAuthToken();
    res.send(token);
});

function validate(user) {
    const schema = {
        email: Joi.string().min(5).max(50).required().email(),
        password: Joi.string().min(5).max(16).required()
    };

    return Joi.validate(user, schema);
}

module.exports = router;