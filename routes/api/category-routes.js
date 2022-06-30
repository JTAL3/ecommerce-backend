const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll({
    include: [
      {model: Product,
      attributes: ["product_name"],},
    ],
  })
  // be sure to include its associated Products
  .then((categoryData) => res.json(categoryData))
  .catch((err) => {
    console.log(err);
    res.json(err);
  });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {model: Product,
      attributes: ["Product_name"],},
    ],
  })
  // be sure to include its associated Products
  .then((categoryData) => res.json(categoryData))
  .catch((err) => {
    console.log(err);
    res.json(err);
  });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
  })
  .then(dbCategoryData => res.json(dbCategoryData))
  .catch(err => {
    console.log(err);
    res.status(400).json(err);
  })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
  .then((categoryData) => res.json(categoryData))
  .catch((err) => {
    console.log(err);
    res.json(err);
  })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
  .then((deleteCategory) => res.json(deleteCategory))
  .catch((err) => {
    console.log(err);
    res.json(err);
  });
});

module.exports = router;
