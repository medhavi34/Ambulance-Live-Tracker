const express = require('express');
const morgan = require('morgan');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT||8080;

const connectDB = require('./server/database/connection')

// log requests
app.use(morgan('tiny'));

// mongoDB connection

connectDB();

// pass req to body-parser
app.use(express.urlencoded({
    extended: true
  }));
app.use(express.json());

// set view engine
app.set('view engine', "ejs");

// app.set('views',path.resolve(__dirname,"views/ejs")); - to access a folder


// load assets 
app.use('/css',express.static(path.resolve(__dirname,'assests/css')));
app.use('/js',express.static(path.resolve(__dirname,'assests/js')));
app.use('/img',express.static(path.resolve(__dirname,'assests/img')));

// load routers

app.use('/',require('./server/routes/router'));


app.listen(PORT, ()=> console.log('Server is running at http://localhost:'+PORT));