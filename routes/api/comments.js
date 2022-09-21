const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../../models/User');
const Post = require('../../models/Post');

const validateCommentInput = require('../../validation/comment.js');
const { loginUser, restoreUser, requireUser } = require('../../config/passport');
const { isProduction } = require('../../config/keys');

//post a comment

//update a comment
//delete a comment


module.exports = router;