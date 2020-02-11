const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');
const routes = require('./routes/routes');

class App {

    constructor() {
        this.server = express();
        this.useMiddlewares();
    }

    useMiddlewares() {
        this.server.use(cors());
        this.server.use(logger('dev'));
        this.server.use(bodyParser.json());
        this.server.use(bodyParser.urlencoded({ extended: true }));
        this.server.use(express.urlencoded({ extended: true }));
        this.server.use(routes);
    }

}

module.exports = new App();