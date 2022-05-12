const categoryModel = require("../models/category");

const getAllCategories = (req, res) => {
    categoryModel
      .find({})
      .populate("games","title -_id")
      .then((category) => {
        if (category.length) {
          res.status(200).json({
            success: true,
            message: `All the Categories`,
            category: category,
            games: category.games,
          });
        } else {
          res.status(200).json({
            success: false,
            message: `No Categories Yet`,
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: `Server Error`,
          err: err.message,
        });
      });
};


const createCategory = (req, res) => {
  const { title, games } = req.body;
  const category = new categoryModel({
    title,
    games,
  });

  category
    .save()
    .then((result) => {
      res.status(201);
      res.json({
        success: true,
        message: "New Category created",
        category: result,
      });
    })
    .catch((err) => {
      res.status(500);
      res.send({
        success: false,
        message: "Servcer Error",
        err: err.message,
      });
    });
};

module.exports = { getAllCategories, createCategory };
