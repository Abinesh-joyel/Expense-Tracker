const express = require('express');
const categoryController = require('../controller/category');

const router = express.Router();

router.get('', categoryController.fetchCategory);

router.post('', categoryController.createCategory);

router.delete('/:id', categoryController.deleteCategory);

router.post('/many', categoryController.createManyCategory);

module.exports = router;
