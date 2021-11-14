const express = require('express');

const hbsConfig = require('./config/hbsConfig');
const expressConfig = require('./config/expressConfig');


const app = express();

hbsConfig(app);
expressConfig(app);

app.get('/', (req, res) => {
   res.render('home', { layout: false });
})

app.listen(5000, console.log('App is running...'));