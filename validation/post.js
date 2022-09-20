const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');

const validatePostInput = [
    check('title')
      .exists({ checkFalsy: true })
      .isLength({ min: 2, max: 60 })
      .withMessage('Title must be between 2 and 60 characters'),
    check('body')
      .exists({ checkFalsy: true })
      .isLength({ min: 2, max: 255 })
      .withMessage('Body must be between 2 and 255 characters'),
    handleValidationErrors
  ];
  
  module.exports = validatePostInput;