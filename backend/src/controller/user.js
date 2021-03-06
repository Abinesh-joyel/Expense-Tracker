const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.loginUser = (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        res.status(401).json({
          message: 'Invalid Credentials',
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((result) => {
      if (!result) {
        res.status(401).json({
          message: 'Invalid Credentials',
        });
      }
      const token = jwt.sign(
        {
          email: fetchedUser.email,
          userId: fetchedUser._id,
        },
        'secret_this_should_be_longer',
        {
          expiresIn: '1h',
        }
      );
      res.status(200).json({
        token: token,
        userId: fetchedUser._id,
      });
    })
    .catch((err) => {
      res.status(401).json({
        message: 'Auth failed',
      });
    });
};

exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      email: req.body.email,
      password: hash,
    });
    user
      .save()
      .then((user) => {
        res.status(201).json({
          message: 'User created',
          result: user,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: 'Invalid auth details or details already taken',
        });
      });
  });
};
