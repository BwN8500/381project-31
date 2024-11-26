var express = require('express');
const cookieParser = require('cookie-parser');
var app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const port = process.env.PORT || 8080;
const setHeaders = require('./middleware/header');
const { connectDB } = require('./db/db');

app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(setHeaders);


const startServer = async () => {
    await connectDB();
    const initRoutes = require('./routes/routes');
    initRoutes(app);
};

startServer().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
});


