const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');

const validateCommentInput = [
    check('body')
      .exists({ checkFalsy: true })
      .isLength({ min: 2, max: 500 })
      .withMessage('body must be between 2 and 500 characters'),

      handleValidationErrors
];

module.exports = validateCommentInput;