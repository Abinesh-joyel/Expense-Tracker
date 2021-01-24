const path = require('path');
const ejs = require('ejs');
const pdf = require('html-pdf');
const Report = require('../models/report');
const Expense = require('../models/expense');

exports.getReports = (req, res, next) => {
  const list = Report.find();
  list
    .then((reports) => {
      res.status(200).json({
        message: 'Reports fetched successfully',
        data: reports,
      });
    })
    .catch((e) => {
      res.status(400).json({
        message: e.message,
      });
    });
};

const dateFormat = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${month > 9 ? month : '0' + month}.${day > 9 ? day : '0' + day}.${year}`;
};

exports.createPDF = (req, res, next) => {
  // console.log(req.protocol + '://' + req.get('host'));
  let { start, end, format } = req.body;
  start = new Date(start);
  end = new Date(end);
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
      const from = dateFormat(start);
      const to = dateFormat(end);
      const today = dateFormat(new Date());
      const pdfData = {
        start: from,
        end: to,
        date: today,
        data: resp,
        totalExpense,
      };
      ejs.renderFile(path.join(__dirname, '../templates/', 'expense_document.ejs'), { data: pdfData }, (err, data) => {
        if (err) {
          console.log('error', err);
          res.send(err);
        } else {
          const options = { format: 'Letter' };
          const pdfName = `expense_${today}_${Date.now()}.pdf`;
          pdf.create(data, options).toFile('backend/src/pdf/' + pdfName, function (err, data) {
            if (err) {
              console.log('error', err);
              res.send(err);
            } else {
              const report = new Report({ name: pdfName, from: start, to: end, format });
              report
                .save()
                .then(() => {
                  res.status(200).json({
                    data: { name: pdfName },
                    message: 'File created successfully',
                  });
                })
                .catch((e) => {
                  res.status(500).json({
                    message: e.message,
                  });
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
