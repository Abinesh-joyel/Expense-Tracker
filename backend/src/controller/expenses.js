const Expense = require('../models/expense');

exports.createExpense = (req, res, next) => {
  const body = req.body;
  const expense = new Expense(body);
  expense
    .save()
    .then((resp) => {
      res.status(201).json({
        data: resp,
        message: 'Expense Added Successfully',
      });
    })
    .catch((err) => {
      res.status(400).json({
        message: err.message,
      });
    });
};

exports.getExpenseById = (req, res, next) => {
  const { id } = req.params;
  const expense = Expense.findById({ _id: id });
  expense
    .then((resp) => {
      res.status(200).json({
        data: resp,
        message: 'Expense fetched successfully',
      });
    })
    .catch((err) => {
      res.status(400).json({
        message: err.message,
      });
    });
};

exports.getExpenses = (req, res, next) => {
  const { start, end } = req.query;
  const expense = Expense.find({
    $and: [{ date: { $gte: start } }, { date: { $lte: end } }],
  });
  const month = new Date(start).getMonth();
  expense
    .then((resp) => {
      res.status(200).json({
        data: resp,
        month,
        message: 'Expense list fetched successfully',
      });
    })
    .catch((err) => {
      res.status(400).json({
        message: err.message,
      });
    });
};

exports.deleteExpense = (req, res, next) => {
  const { id } = req.params;
  Expense.deleteOne({ _id: id })
    .then((result) => {
      if (result.n > 0) {
        res.status(200).json({
          message: 'Expense deleted',
        });
      }
    })
    .catch((err) => {
      res.status(400).json({
        message: err.message,
      });
    });
};

exports.updateExpense = (req, res, next) => {
  const { _id, ...body } = req.body;
  setTimeout(() => {
    Expense.updateOne({ _id }, body)
      .then((result) => {
        if (result.n > 0) {
          res.status(200).json({
            data: req.body,
            message: 'Updated sucessfully',
          });
        }
      })
      .catch((err) => {
        res.status(400).json({
          message: err.message,
        });
      });
  }, 3000);
};
