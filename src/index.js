const express = require('express');

const {PORT} = require('./constants');
const hbsConfig = require('./config/hbsConfig');
const expressConfig = require('./config/expressConfig');
const routes = require('./routes');


const app = express();

hbsConfig(app);
expressConfig(app);

app.use(routes);


app.listen(PORT, console.log('App is running...'));