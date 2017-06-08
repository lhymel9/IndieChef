//imported modules
const express = require('express');
const routes = require('./routes/api.js');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//establish express app
const app = express();

mongoose.connect('mongodb://localhost/ninjago');
mongoose.Promise = global.Promise;

app.use(express.static('../IndieChef/src/main'));

app.use(bodyParser.json());

app.use('/api', routes);

app.use(function(err, request, response, next) {
    console.log("Error Message: " + err);
    response.status(422).send({"error":err.message});
});

//listen for requests
app.listen(process.env.port || 4000, function() {
    console.log('now listening for requests');
});