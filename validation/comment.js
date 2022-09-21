const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');

const validateCommentInput = [
    check('body')
      .exists({ checkFalsy: true })
      .isLength({ min: 2, max: 255 })
      .withMessage('body must be between 2 and 255 characters'),
]