const express = require('express');
const router = express.Router();

require('./mapQuest-routes')(router);

module.exports = router;
