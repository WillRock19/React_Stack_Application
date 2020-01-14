const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-tqcer.mongodb.net/test?retryWrites=true&w=majority', {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

app.use(express.json()); //making express understand requests that uses json (must be use before routes are defined)
app.use(routes);

app.listen(1999);


/* Notes from class:
    Route Params: request.query;
    Route Params: request.params;
    Body  Params: request.body;
*/