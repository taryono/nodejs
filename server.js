const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const Loki = require("lokijs");

require('dotenv').config();
const logger = require('morgan');
const cors = require("cors");
var watch = require('node-watch');
const app = express();
const db = require("./app/models");
//db.sequelize.sync();
db.sequelize.sync({ force: false, logging: console.log }).then(() => {
    console.log("Drop and re-sync db.");
});
watch('/', { recursive: false }, console.log);
var corsOptions = {
    origin: "http://localhost:4200"
};

app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '100mb', parameterLimit: 1000000 }));

const routes = require('./app/routes');
app.use('/api', routes.Users);
app.use('/api', routes.Tutorials);
app.use('/api', routes.Auth);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});