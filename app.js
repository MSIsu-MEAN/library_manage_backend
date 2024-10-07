var express = require('express');
var app = express();

//bodyparser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//cors to connect with frontend
var cors=require('cors')
app.use(cors())

//env to secure sensitive datas
var env=require('dotenv').config()

// local or server integration
var config=require("../MEAN_backend/config/local")

//routers path
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
app.use('/', indexRouter);
app.use('/users', usersRouter);


//port listening
app.listen(3636, () => {
  console.log("port Listen 3636");
});

