const Category = require('../models/category');

exports.createCategory = (req, res, next) => {
  //console.log('create');
  const { name, icon, type } = req.body;
  const category = new Category({ name, icon, type });
  category
    .save()
    .then((res) => {
      res.status(201).json({
        data: res,
        message: 'category added',
      });
    })
    .catch((err) => {
      res.status(400).json({
        message: err.message,
      });
    });
};

exports.createManyCategory = (req, res, next) => {
  console.log('create many');
  const categories = req.body;
  console.log(req.body);
  if (!(categories instanceof Array)) {
    res.status(422).json({
      message: 'bad data',
    });
  }
  const category = Category.insertMany(categories);
  category
    .then((resp) => {
      res.status(201).json({
        message: 'categories added',
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({
        message: err.message,
      });
    });
};

exports.fetchCategory = (req, res, next) => {
  //console.log('fetch');
  let categories = [];
  const list = Category.find({ type: 'expense' }, 'name icon').sort({
    name: 1,
  });
  list
    .then((documents) => {
      categories = documents;
      return Category.count();
    })
    .then((count) => {
      res.status(200).json({
        categories,
        count,
        message: 'categories fetched successfully',
      });
    });
};

exports.deleteCategory = (req, res, next) => {
  //console.log('delete');
  const id = req.params.id;
  Category.deleteOne({ _id: id }).then((result) => {
    if (result.n > 0) {
      res.status(200).json({
        message: 'category deleted',
      });
    }
  });
};
