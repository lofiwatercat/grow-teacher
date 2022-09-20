const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../../models/User');
const Post = require('../../models/Post');
const validatePostInput = require('../../validation/post.js');
const { loginUser, restoreUser, requireUser } = require('../../config/passport');
const { isProduction } = require('../../config/keys');

// get all posts
router.get("/", async(req, res) => {
    if (!isProduction) {
        const csrfToken = req.csrfToken();
        res.cookie("CSRF-TOKEN", csrfToken);
    }
    Post.find({})
        .then(async (posts) => {
            const payload = await Promise.all(posts.map(async post => {
                const p = {};
                p.title = post.title
                p.body = post.body
                p.items = post.items
                p.author_name = await User.findOne({ _id: post.author }).then((res) => { 
                    return "test_name";
                })
                p._id = post._id;
                return p;
            }))
            res.json(payload)
        }
        )
        .catch(err => res.status(404).json({nopostsfound: 'No posts found'}));
})

// get one post
router.get("/:id", (req, res) => {
    if (!isProduction) {
        const csrfToken = req.csrfToken();
        res.cookie("CSRF-TOKEN", csrfToken);
    }
    Post.findOne({id: req.params._id})
    .then(async post => 
    {
        await post.populate('author', '_id username email')
        return res.json(post);
    })
    .catch(err => res.status(404).json({nopostsfound: 'No posts found with that ID'}));
})

//post a post
router.post('/',requireUser, async(req, res, next) => {
    if (!isProduction) {
        const csrfToken = req.csrfToken();
        res.cookie("CSRF-TOKEN", csrfToken);
        // console.log(res)
    }
    try {
        const newPost = new Post({
        title: req.body.title,
        body: req.body.body,
        items: req.body.items,
        author: req.user._id
      });
    //   console.log(newPost, "HELLLOEEE")

      let post = await newPost.save();
      post = await post.populate('author', '_id username email');
      return res.json(post);
    }
    catch(err) {
      next(err);
    }
  }
)

//update a post
router.patch('/:id',requireUser, async(req, res, next) => {
    Post.findOneAndUpdate({id: req.params.id},
        req.body,
        { new: true, useFindAndModify: false },
        (err, post) => {
            if (err) return res.status(500).send(err);
            return res.json(post);
        })
})

//delete a post
router.delete('/:id', (req, res) => {
    Post.findOneAndDelete({ id: req.params.id },
        (err, post) => {
            if (err) return res.status(500).send(err);
            return res.json({
                title: post.title,
                _id: post._id,
                body: req.body.body,
                items: req.body.items,
                author: req.user._id
            });
        })
})

module.exports = router;
