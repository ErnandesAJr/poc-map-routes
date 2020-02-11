const app = require('./src/app');
const server = require('http').Server(app.server);

require('dotenv').config();

const context = {
    express: process.env.PORT || 3000,
    environment: process.env.NODE_ENV || 'development'
};

server.listen(context.express, () => {
    console.log('PoC MapQuest Application running at port ' + context.express);
});