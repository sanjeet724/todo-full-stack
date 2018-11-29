const _ = require('lodash');
const bcrypt = require("bcrypt");

const { User, validate } = require("../models/user");
const express = require("express");
const router = express.Router();

router.get('/me', (req, res) => {
    res.send("User API is Up");
    res.end();
});

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

    // validate if user already exists
    if (user) {
        return res.status(400).send("User already exists: " + user.email);
    }

    // create a new user
    user = new User(_.pick(req.body, ['name', 'email', 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save(); // save returns a promise

    // set auth-token for newly registered user
    const token = user.generateAuthToken();
    res.header('x-auth-token', token)
        .header("access-control-expose-headers", "x-auth-token")
        .send(_.pick(user, ['_id', 'name', 'email']));
});

module.exports = router;