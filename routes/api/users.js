const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('../../models/User')
const User = mongoose.model('User');
const bcrypt = require('bcryptjs');
const passport = require('passport');

const validateRegisterInput = require('../../validation/register.js');
const validateLoginInput = require('../../validation/login.js');
const { loginUser, restoreUser } = require('../../config/passport');
const { isProduction } = require('../../config/keys');
const { requireUser } = require("../../config/passport");

router.get("/test", (req, res) => res.json({ msg: "This is the users route" }));

router.get('/current', restoreUser, (req, res) => {
  if (true) {
    // In development, allow React server to gain access to the CSRF token
    // whenever the current user information is first loaded into the
    // React application
    const csrfToken = req.csrfToken();
    res.cookie("CSRF-TOKEN", csrfToken);
  }
  if (!req.user) return res.json(null);
  res.json({
    _id: req.user._id,
    username: req.user.username,
    email: req.user.email
  });
})

router.post('/register',validateRegisterInput, async (req, res, next) => {
  // Check to make sure nobody has already registered with a duplicate email
  // or username
  const user = await User.findOne({
    $or: [{ email: req.body.email }, { username: req.body.username }]
  });
  if (user) {
    // Throw a 400 error if the email address and/or email already exists
    const err = new Error("Validation Error");
    err.statusCode = 400;
    const errors = {};
    if (user.email === req.body.email) {
      errors.email = "A user has already registered with this email";
    }
    if (user.username === req.body.username) {
      errors.username = "A user has already registered with this username";
    }
    err.errors = errors;
    return next(err);
  }
  // Otherwise create a new user
  const newUser = new User({
    username: req.body.username,
    email: req.body.email
  });

  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err;
    bcrypt.hash(req.body.password, salt, async (err, hashedPassword) => {
      if (err) throw err;
      try {
        newUser.hashedPassword = hashedPassword;
        const user = await newUser.save();
        return res.json(await loginUser(user));
      }
      catch(err) {
        next(err);
      }
    })
  });
});

//login
router.post('/login', validateLoginInput, async (req, res, next) => {
  passport.authenticate('local', async function(err, user) {
    if (err) return next(err);
    if (!user) {
      const err = new Error('Invalid credentials');
      err.statusCode = 400;
      err.errors = { email: "Invalid credentials" };
      return next(err);
    }
    return res.json(await loginUser(user));
  })(req, res, next);
});

// Update a user
router.patch(
  "/:id",
  requireUser,
  async (req, res) => {
    if (!isProduction) {
      const csrfToken = req.csrfToekn();
      res.cookie("CSRF-TOKEN", csrfToken);
    }

    User.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true, useFindAndModify: false },
      (err, user) => {
        if (err) {
          return res.status(400).send(err)
        }
        return res.json(user);
      }
    )
  }
)

module.exports = router;
