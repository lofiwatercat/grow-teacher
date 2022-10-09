const { body, check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');

const validatePostInput = [
    check('title')
      .exists({ checkFalsy: true })
      .isLength({ min: 2, max: 60 })
      .withMessage('Title must be between 2 and 60 characters'),
    check('body')
      .exists({ checkFalsy: true })
      .isLength({ min: 2, max: 1000 })
      .withMessage('Body must be between 2 and 1000 characters'),
    check("items.*.name")  
      .exists({ checkFalsy: true })
      .withMessage('name must exist'),
    check("items.*.totalCost")  
      .exists({ checkFalsy: true })
      .withMessage('total cost must be included'),
    check("items.*.amount")  
      .exists({ checkFalsy: true })
      .withMessage('amount must be included'),

    handleValidationErrors
  ];
  
  module.exports = validatePostInput;