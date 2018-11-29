const config = require('config');
const cors = require("cors");
const express = require("express");
const app = express();
const users = require('./routes/users');
const auth = require('./routes/auth')
const tasks = require('./routes/tasks')
const mongoose = require('mongoose');

if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined');
    process.exit(1);
}

mongoose.connect('mongodb://localhost/todo', {
    useNewUrlParser: true
}).then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Couldn't connect to MonogoDB"));

// middle-ware to pass json in post requests
app.use(express.json());
// allow cross-origin requests
app.use(cors());

//route the requests to a specfic API's
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/tasks', tasks);

const port = process.env.PORT || config.get('port');

app.listen(port, () => {
    console.log("Listening on port 3900...");
});