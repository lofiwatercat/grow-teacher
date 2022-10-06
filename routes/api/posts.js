const express = require("express");
const router = express.Router();
const multer = require("multer");
const Aws = require("aws-sdk");
const multers3 = require("multer-s3");

// const upload = multer({ storage: storage, fileFilter: filefilter })

//AWS stuff
const s3 = new Aws.S3({
    accessKeyId: process.env.S3_ACCESS_KEY,              // accessKeyId that is stored in .env file
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,       // secretAccessKey is also store in .env file
    region: process.env.S3_BUCKET_REGION,
});
const fileImage = `image-${Date.now()}.jpeg` || `image-${Date.now()}.png`
const upload = multer({
    storage: multers3({
        s3,
        bucket: 'grow-teacher-dev',
        // metadata: function(req, file, cb) {
        //     cb(null, {fieldName: file.fieldname});
        // },
        key: function(req, file, cb) {
            console.log(file);
            //cb(null, `image-${Date.now()}.jpeg`); //add timestamps to make sure we uploading even if it's the same image type
            //cb(null, `image.jpeg`); //add timestamps to make sure we uploading even if it's the same image type
            cb(null, file.fieldname + '-' + Date.now())
        },
    }),
});
//Aws stuff

// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

const mongoose = require("mongoose");
const passport = require("passport");

const User = require("../../models/User");
const Post = require("../../models/Post");
const Item = require("../../models/Post");
const Comment = require("../../models/Comment");

const validatePostInput = require("../../validation/post.js");
const validateCommentInput = require("../../validation/comment.js");

const { requireUser } = require("../../config/passport");
const { isProduction } = require("../../config/keys");
const { get } = require("http");

// get all posts
router.get("/", async (req, res) => {
  if (!isProduction) {
    const csrfToken = req.csrfToken();
    res.cookie("CSRF-TOKEN", csrfToken);
  }
  Post.find({})
    .then(async (posts) => {
      const payload = await Promise.all(
        posts.map(async (post) => {
          const p = {};
          p.title = post.title;
          p.body = post.body;
          p.items = post.items;
          p.imageUrl = post.imageUrl;
          p.author_name = await User.findOne({ _id: post.author }).then(
            (res) => {
              return res.username;
            }
          );
          p._id = post._id;
          return p;
        })
      );
      res.json(payload);
    })
    .catch((err) => res.status(404).json({ nopostsfound: "No posts found" }));
});

// get one post
router.get("/:id", (req, res) => {
  if (!isProduction) {
    const csrfToken = req.csrfToken();
    res.cookie("CSRF-TOKEN", csrfToken);
  }
  let newPost = Post.findById(req.params.id)

  newPost
    .populate("author", "_id username email")
    .populate("comments")
    .then(post => {
      return res.json(post)
    })
    .catch(err =>
      res.status(404).json({ nopostfound: 'No post found with that ID' })
    );
})

//post a post
router.post("/",
  requireUser,
  upload.single("imageUrl"),
  async (req, res, next) => {
    if (!isProduction) {
      const csrfToken = req.csrfToken();
      res.cookie("CSRF-TOKEN", csrfToken);
    }
    const file = req.file;
    
          const newPost = new Post({
            title: req.body.title,
            body: req.body.body,
            items: JSON.parse(req.body.items).map(
              
                (item) => {

                  return ({
                    name: item.name,
                    totalCost: item.totalCost,
                    amount: item.amount,
                    details: item.details,
                    status: false,
                  })}
              ),
            author: req.user._id,
            imageUrl: s3.getSignedUrl('getObject', {
                Bucket: 'grow-teacher-dev',
                Key: req.file.key,
                // Expires: null
            }),
          });

          let post = await newPost.save();
          post = post
            .populate("author", "_id username email");
          post.then((post) => res.json(post));
        }
);

//update a post
router.patch(
  "/:id",
  requireUser,
  upload.single("imageUrl"),
  async (req, res) => {
    if (!isProduction) {
      const csrfToken = req.csrfToken();
      res.cookie("CSRF-TOKEN", csrfToken);
    }
    // const file = req.file;

    Post.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true, useFindAndModify: false },
      (err, post) => {
        if (err) {
          return res.status(400).send(err);
        }
        // res.send({"status": "updated"});
        return res.json(post);
      }
    );
  }
);
//delete a file from AWS
function deleteFileStream(fileKey, next) {
  const deleteParams = {
      Key: fileKey,
      Bucket: process.env.AWS_BUCKET_NAME,
  }
  s3.deleteObject(deleteParams, (error, data) => {
      next(error, data)
  })
}
//delete a file from AW3

//delete a post
router.delete("/:id", requireUser, (req, res) => {
  if (!isProduction) {
    const csrfToken = req.csrfToken();
    res.cookie("CSRF-TOKEN", csrfToken);
  }
  Post.findOneAndDelete({ _id: req.params.id }, (err, post) => {
    if (err) return res.status(500).send(err);

    deleteFileStream(req.params.id, (error, data) => {
        if (error) {
            return res.send({ error: "Can not delete file, Please try again later" });
        }
        return res.send({ message: "File has been deleted successfully" });
    });
  });
});

//get all posts of a user
router.get("/user/:user_id", (req, res) => {
  Post.find({ user: req.params.user_id })
    .sort({ createdAt: -1 })
    .populate("author")
    .then((posts) => res.json(posts))
    .catch((err) =>
      res.status(404).json({ nopostsfound: "No posts found from that user" })
    );
});

router.post('/:id/comments', requireUser, async (req, res, next) => {
  if (!isProduction) {
    const csrfToken = req.csrfToken();
    res.cookie("CSRF-TOKEN", csrfToken);
  }
  const post = await Post.findOne({ _id: req.params.id })
  // Make the new comment with the request information
  try {
    const newComment = new Comment({
      body: req.body.body,
      post: req.params.id,
      author: req.user.id,
      replies: req.body.replies,
      username: req.user.username
    });
    newComment.post = post;
    await newComment.save();
    let comments = post.comments;
    comments.push(newComment._id);
    // console.log(comments)
    const newPost = await Post.findOneAndUpdate({ _id: req.params.id }, { comments })



    comment = await newComment.populate('post', '_id');
    return res.json(comment);
  }
  catch (err) {
    next(err);
  }
}
)

// read a comment(don't know if you'll need that one)
router.get('/:id/comments', async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id }).populate('comments');
  res.send(post);
})

// update a comment
router.patch('/:id/comments/:commentId/edit', requireUser, async (req, res, next) => {
  if (!isProduction) {
    const csrfToken = req.csrfToken();
    res.cookie("CSRF-TOKEN", csrfToken);
  }
  Comment.findOneAndUpdate({ _id: req.params.commentId },
    req.body,
    { new: true, useFindAndModify: false },
    (err, comment) => {
      if (err) return res.status(500).send(err);
      return res.json(comment);
    })
})

// delete a comment
router.delete('/:id/comments/:commentId', requireUser, (req, res) => {
  if (!isProduction) {
    const csrfToken = req.csrfToken();
    res.cookie("CSRF-TOKEN", csrfToken);
  }
  Comment.findById(req.params.commentId)
    .then(comment => {
      if (comment.author.toString() === req.user.id) {
        Comment.findByIdAndRemove(req.params.commentId, (err, comment) => {
          return res.status(200).json(`sucessfully deleted comment`)
        })
      } else {
        return res.status(422).json({ invalidcredentials: `invalid credentials for deleting comment` })
      }
    })
    .catch(err => {
      return res.status(422).json({ nocommentfound: `No comment found with that ID` })
    })
});

//reply to a comment
// router.post("/:id/comments/:commentId", requireUser, async (req, res, next) => {
//   if (!isProduction) {
//     const csrfToken = req.csrfToken();
//     res.cookie("CSRF-TOKEN", csrfToken);
//   }
//   try {
//     const newComment = new Comment({
//       body: req.body.body,
//       post: req.params.id,
//       author: req.user.id,
//       replies: req.body.replies,
//     });

//     let comment = await newComment.save();
//     comment = await comment
//       .sort({ createdAt: -1 })
//       .populate("author", "username");
//     return res.json(comment);
//   } catch (err) {
//     next(err);
//   }
// });
//reply to a comment


//searchBar
// `/api/posts/search/${query}`
router.get('/search/:query', (req, res) => {
  // console.log(req.params.query, 'this should be the query')
  Post.find({
    $or: [{ "title": { $regex: req.params.query, $options: 'i' } },
    { "author_name": { $regex: req.params.query, $options: 'i' }},
    ]
  })
    .then(posts => {
      console.log(posts);
      return res.json(posts);
    })
    .catch(err => res.status(404).json({ nopostsfound: 'No posts found with that query' }));
})

module.exports = router;
