const express = require('express');

const {PORT} = require('./constants');
const hbsConfig = require('./config/hbsConfig');
const expressConfig = require('./config/expressConfig');
const routes = require('./routes');
const {initDb} = require('./config/dbConfig');

const app = express();

hbsConfig(app);
expressConfig(app);

app.use(routes);

initDb()
    .then(() => {
        app.listen(PORT, console.log('App is running...'));
    })
    .catch(err => console.log('Cannot connect BD: ', err));
