const path = require('path');
const ejs = require('ejs');
const pdf = require('html-pdf');
const Report = require('../models/report');

exports.createPDF = (req, res, next) => {
  // console.log(req.protocol + '://' + req.get('host'));
  const start = new Date(2020, 8, 1);
  const end = new Date(2020, 9, 0);
  // console.log(start);
  Expense.aggregate([
    {
      $match: {
        $and: [{ date: { $gte: start } }, { date: { $lte: end } }],
      },
    },
    {
      $group: {
        _id: '$date',
        expense: { $push: { id: '$_id', memo: '$memo', amount: '$amount' } },
        total: { $sum: '$amount' },
      },
    },
    {
      $project: {
        date: '$_id',
        expense: 1,
        total: 1,
        _id: 0,
      },
    },
  ])
    .then((resp) => {
      const totalExpense = resp.reduce((acc, cur) => {
        return acc + cur.total;
      }, 0);
      const pdfData = {
        // start: start.toLocalString('default', { dateStyle: 'long' }),
        // end: end.toLocaleString('default', { dateStyle: 'long' }),
        data: resp,
        totalExpense,
      };
      ejs.renderFile(path.join(__dirname, '../templates/', 'expense_document.ejs'), { data: pdfData }, (err, data) => {
        if (err) {
          console.log('error', err);
          res.send(err);
        } else {
          const options = { format: 'Letter' };
          const pdfName = 'expense_from_to.pdf';
          pdf.create(data, options).toFile('backend/src/pdf/' + pdfName, function (err, data) {
            if (err) {
              console.log('error', err);
              res.send(err);
            } else {
              res.status(200).json({
                data: resp,
                message: 'File created successfully',
              });
            }
          });
        }
      });
    })
    .catch((err) => {
      console.log('error', err);
      res.send(err);
    });
};
