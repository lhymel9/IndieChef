//imported modules
const express = require('express'),
    cookieParser = require('cookie-parser'),
    routes = require('./routes/api.js'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    fs = require('fs'),
    multer = require('multer');

//establish express app
const app = express();

//Multer
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  }
});
var upload = multer({storage: storage}).array('media', 1);

mongoose.connect('mongodb://localhost/indiechef');
mongoose.Promise = global.Promise;

app.use(express.static('../IndieChef/src/main'));
app.use(cookieParser());
app.use(multer().any());
app.use(cors());
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