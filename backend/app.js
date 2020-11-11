const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const categoryRoutes = require('./src/routes/category');
const expenseRoutes = require('./src/routes/expenses');
const reportRoutes = require('./src/routes/report');
const authRoutes = require('./src/routes/user');

const app = express();

mongoose
  .connect('mongodb://127.0.0.1:27017/express-tracker')
  .then(() => {
    console.log('connected to database');
  })
  .catch(() => {
    console.log('error in connecting db');
  });

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');

  next();
});

app.use('/api/user', authRoutes);

app.use('/api/category', categoryRoutes);

app.use('/api/expense', expenseRoutes);

app.use('/api/report', reportRoutes);

module.exports = app;
