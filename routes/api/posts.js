const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const User = require('../../models/User');
const Post = require('../../models/Post');
const Comment = require('../../models/Comment');

const validatePostInput = require('../../validation/post.js');
const validateCommentInput = require('../../validation/comment.js');

const { requireUser } = require('../../config/passport');
const { isProduction } = require('../../config/keys');
const { get } = require('http');

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
                    return res.username;
                })
                p.comments = post.comments
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
    let newPost = Post.findById(req.params.id)


    newPost.populate("comments.comment.author")
        .then(post => res.json(post))
        .catch(err =>
            res.status(404).json({ nopostfound: 'No post found with that ID' })
        );
})

//post a post
router.post('/',requireUser, validatePostInput, async(req, res, next) => {
    if (!isProduction) {
        const csrfToken = req.csrfToken();
        res.cookie("CSRF-TOKEN", csrfToken);
    }
    try {
        const newPost = new Post({
        title: req.body.title,
        body: req.body.body,
        items: req.body.items,
        author: req.user._id
      });

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
router.patch('/:id',requireUser, validatePostInput, async(req, res, next) => {
    if (!isProduction) {
        const csrfToken = req.csrfToken();
        res.cookie("CSRF-TOKEN", csrfToken);
    }
    Post.findOneAndUpdate({_id: req.params.id},
        req.body,
        { new: true, useFindAndModify: false, populate: { path: 'author' }},
        (err, post) => {
            if (err) return res.status(500).send(err);
            return res.json(post);
        })
})

//delete a post
router.delete('/:id',requireUser, (req, res) => {
    if (!isProduction) {
        const csrfToken = req.csrfToken();
        res.cookie("CSRF-TOKEN", csrfToken);
    }
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

//get all posts of a user
router.get('/user/:user_id', (req, res) => {
    Post.find({user: req.params.user_id})
        .sort({ createdAt: -1 })
        .populate("author")
        .then(posts => res.json(posts))
        .catch(err =>
            res.status(404).json({ nopostsfound: 'No posts found from that user' }
        )
    );
});


//create a comment
router.post('/:id/comments',requireUser, async(req, res, next) => {
    if (!isProduction) {
        const csrfToken = req.csrfToken();
        res.cookie("CSRF-TOKEN", csrfToken);
    }
    //find a post
    // console.log("taylor swift", req.body.body)
    const post = await Post.findOne({ _id: req.params.id})
    try {
        const newComment = new Comment({
        body: req.body.body,
        post: req.params.id,
        author: req.user.id,
        replies: req.body.replies,
      });
      newComment.populate('author', '_id username email createdAt updatedAt');
      newComment.post = post;
      await newComment.save();
    //   console.log(comment, "this is the comment")
      //associate post w/ comment
    //   if(!post.comment) {
    //     return [];
    //   }
    //   post.comments ||= [];
    let comments = post.comments;
    comments.push(newComment);
    // console.log(comments)
      const newPost = await Post.findOneAndUpdate({ _id: req.params.id}, {comments})


    //   newPost.comments.push(newComment)
    //   await newPost.save()
    //   console.log(newPost, 'this is the post');
    //   debugger;

      comment = await newComment.populate('post', '_id');
      return res.json(comment);
    }
    catch(err) {
      next(err);
    }
  }
)
/////read a comment(don't know if you'll need that one)
router.get('/:id/comments', async (req, res) => {
    const post = await Post.findOne({_id: req.params.id}).populate('comments');
    res.send(post);
})
//update a comment
router.patch('/:id/comments/:commentId/edit',requireUser, async(req, res, next) => {
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
router.delete('/:id/comments/:commentId', requireUser, (req, res) => {
    if (!isProduction) {
        const csrfToken = req.csrfToken();
        res.cookie("CSRF-TOKEN", csrfToken);
    }
        Comment.findById(req.params.commentId)
        .then(comment => {
          if (comment.author.toString() === req.user.id){
            Comment.findByIdAndRemove(req.params.commentId, (err, comment) => {
              return res.status(200).json(`sucessfully deleted comment`)
            })
          } else 
          {
            return res.status(422).json({ invalidcredentials: `invalid credentials for deleting comment` })
          }
        })
        .catch(err => {
          return res.status(422).json({ nocommentfound: `No comment found with that ID` })
        })
});

//reply to a comment
// router.post('/:id/comments/:commentId',requireUser, async(req, res, next) => {
//     if (!isProduction) {
//         const csrfToken = req.csrfToken();
//         res.cookie("CSRF-TOKEN", csrfToken);
//     }
//     try {
//         const newComment = new Comment({
//         body: req.body.body,
//         post: req.params.id,
//         author: req.user.id,
//         replies: req.body.replies,
//       });

//       let comment = await newComment.save();
//       comment = await comment.sort({ createdAt: -1 }).populate('author', 'username');
//       return res.json(comment);
//     }
//     catch(err) {
//       next(err);
//     }
//   }
// )
//reply to a comment


module.exports = router;
