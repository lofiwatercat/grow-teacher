const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const User = require('../../models/User');
const Post = require('../../models/Post');
const Comment = require('../../models/Comment');

const validatePostInput = require('../../validation/post.js');
const validateCommentInput = require('../../validation/comment.js');

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
    Post.findOne({_id: req.params.id})
    .then(async post => 
    {
        await post.sort({ createdAt: -1 }).populate('author', '_id username email')
        return res.json(post);
    })
    .catch(err => res.status(404).json({nopostsfound: 'No posts found with that ID'}));
})

//post a post
router.post('/',requireUser, validatePostInput, async(req, res, next) => {
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
      post = await post.sort({ createdAt: -1 }).populate('author', '_id username email');
      return res.json(post);
    }
    catch(err) {
      next(err);
    }
  }
)

//update a post
router.patch('/:id',requireUser, validatePostInput, async(req, res, next) => {
    Post.findOneAndUpdate({_id: req.params.id},
        req.body,
        { new: true, useFindAndModify: false },
        (err, post) => {
            if (err) return res.status(500).send(err);
            return res.json(post);
        })
})

//delete a post
router.delete('/:id',requireUser, (req, res) => {
    Post.findOneAndDelete({_id: req.params.id },
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

//post a comment
router.post('/:id/comments',requireUser, async(req, res, next) => {
    if (!isProduction) {
        const csrfToken = req.csrfToken();
        res.cookie("CSRF-TOKEN", csrfToken);
    }
    try {
        const newComment = new Comment({
        body: req.body.body,
        post: req.params.id,
        author: req.user.id,
        replies: req.body.replies,
      });

      let comment = await newComment.save();
      comment = await comment.sort({ createdAt: -1 }).populate('author', 'username');
      return res.json(comment);
    }
    catch(err) {
      next(err);
    }
  }
)
//update a comment
router.patch('/:id/comment/:commentId/Edit',requireUser, async(req, res, next) => {
    if (!isProduction) {
        const csrfToken = req.csrfToken();
        res.cookie("CSRF-TOKEN", csrfToken);
    }
    Comment.findOneAndUpdate({_id: req.params.commentId},
        req.body,
        { new: true, useFindAndModify: false },
        (err, comment) => {
            if (err) return res.status(500).send(err);
            return res.json(comment);
        })
})
//delete a comment
router.delete('/:id/comment/:commentId',requireUser, (req, res) => {
    Comment.findById(req.params.commentId)
    .then(comment => {
        if (comment.user.toString() === req.user.id) {
            Comment.findByIdAndRemove(req.params.commentId, (err, comment) => {
                return res.status(200).json(`seccessfully deleted comment`)
            })
        } else {
            return res.status(422).json({invalidcredentials: `invalid credentials for deleting comment`})
        }
    })
    .catch(err => {
        return res.status(422).json({nocommentfound: `ne comment not found with that ID`})
    })})

//likes on posts
//likes on 


module.exports = router;
