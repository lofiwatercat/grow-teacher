const express = require("express");
const router = express.Router();
const multer = require("multer");
const Aws = require("aws-sdk");
const multers3 = require("multer-s3");

// const upload = multer({ storage: storage, fileFilter: filefilter })
// const upload = (bucketName) => multer ({
//     storage: multers3({
//         s3,
//         bucket: bucketName,
//         metadata: function(req, file, cb) {
//             cb(null, {fieldName: file.fieldname});
//         },
//         key: function(req, file, cb) {
//             cb(null, `image-${Date.now()}.jpeg`); //add timestamps to make sure we uploading even if it's the same image type
//         },
//     }),
// });

// const s3 = new Aws.S3({
//     accessKeyId: process.env.S3_ACCESS_KEY,              // accessKeyId that is stored in .env file
//     secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,       // secretAccessKey is also store in .env file
//     region: process.env.S3_BUCKET_REGION,
// })
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

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
          p.author_name = await User.findOne({ _id: post.author }).then(
            (res) => {
              return "test_name";
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
  Post.findById(req.params.id)
    .populate("author", "_id username email")
    .then((post) => res.json(post))
    .catch((err) =>
      res.status(404).json({ nopostfound: "No post found with that ID" })
    );
});

//post a post
router.post("/",
  requireUser,
  validatePostInput,
  upload.single("imageUrl"),
  async (req, res, next) => {
    console.log(req.body);
    // debugger
    // debug(req.body)
    if (!isProduction) {
      const csrfToken = req.csrfToken();
      res.cookie("CSRF-TOKEN", csrfToken);
    }
    const file = req.file;
    if (file) {
      const s3FileURL = process.env.AWS_Uploaded_File_URL_LINK;

      let s3bucket = new Aws.S3({
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
        region: process.env.S3_BUCKET_REGION,
      });

      const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: file.originalname,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: "public-read",
      };

      let newFileUploaded = {};

      s3bucket.upload(params, function (err, data) {
        if (err) {
          res.status(500).json({ error: true, Message: err });
        } else {
          newFileUploaded = {
            fileLink: s3FileURL + file.originalname,
            s3_key: params.Key,
          };

          const newPost = new Post({
            title: req.body.title,
            body: req.body.body,
            items: req.body.items,
            author: req.user._id,
            imageUrl: newFileUploaded.fileLink,
          });

          let post = newPost.save();
          post = post
            .sort({ createdAt: -1 })
            .populate("author", "_id username email");
          post.then((post) => res.json(post));
        }
      });
    } else {
      const newPost = new Post({
        title: req.body.title,
        body: req.body.body,
        items: req.body.items.map(
          (item) =>
            new Item({
              name: item.name,
              totalCost: item.totalCost,
              amount: item.amount,
              details: item.details,
              status: false,
            })
        ),
        author: req.user._id,
      });

      let post = await newPost.save();
      console.log(post);
      post = post.populate("author", "_id username email");
      post.then((post) => res.json(post));
    }
  }
);

//update a post
router.patch(
  "/:id",
  requireUser,
  validatePostInput,
  upload.single("file"),
  async (req, res, next) => {
    if (!isProduction) {
      const csrfToken = req.csrfToken();
      res.cookie("CSRF-TOKEN", csrfToken);
    }

    const file = req.file;

    if (file) {
      const s3FileURL = process.env.AWS_Uploaded_File_URL_LINK;

      let s3bucket = new AWS.S3({
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
        region: process.env.S3_BUCKET_REGION,
      });

      const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: file.originalname,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: "public-read",
      };

      let newFileUploaded = {};

      s3bucket.upload(params, function (err, data) {
        if (err) {
          res.status(500).json({ error: true, Message: err });
        } else {
          newFileUploaded = {
            fileLink: s3FileURL + file.originalname,
            s3_key: params.Key,
          };

          Post.findByIdAndUpdate(
            req.body.id,
            { $set: req.body, pictureUrl: newFileUploaded.fileLink },
            { new: true },
            (err, result) => {
              if (err) {
                return res.status(400).json(err);
              }
              res.send("Updated");
            }
          );
        }
      });
    } else {
      Post.findByIdAndUpdate(
        req.body.id,
        { $set: req.body },
        { new: true },
        (err, result) => {
          if (err) {
            return res.status(400).json(err);
          }
          res.send("Updated");
        }
      );
    }
  }
);

//delete a post
router.delete("/:id", requireUser, (req, res) => {
  if (!isProduction) {
    const csrfToken = req.csrfToken();
    res.cookie("CSRF-TOKEN", csrfToken);
  }
  Post.findOneAndDelete({ _id: req.params.id }, (err, post) => {
    if (err) return res.status(500).send(err);
    return res.json({
      title: post.title,
      _id: post._id,
      body: req.body.body,
      items: req.body.items,
      author: req.user._id,
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
//get all comments of one post

//create a comment(route)
router.post("/:id/comment", requireUser, async (req, res, next) => {
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
    comment = await comment
      .sort({ createdAt: -1 })
      .populate("author", "username");
    return res.json(comment);
  } catch (err) {
    next(err);
  }
});
//update a comment
router.patch(
  "/:id/comment/:commentId/Edit",
  requireUser,
  async (req, res, next) => {
    if (!isProduction) {
      const csrfToken = req.csrfToken();
      res.cookie("CSRF-TOKEN", csrfToken);
    }
    Comment.findOneAndUpdate(
      { _id: req.params.commentId },
      req.body,
      { new: true, useFindAndModify: false },
      (err, comment) => {
        if (err) return res.status(500).send(err);
        return res.json(comment);
      }
    );
  }
);
//delete a comment
router.delete("/:id/comment/:commentId", requireUser, (req, res) => {
  if (!isProduction) {
    const csrfToken = req.csrfToken();
    res.cookie("CSRF-TOKEN", csrfToken);
  }
  Comment.findById(req.params.commentId)
    .then((comment) => {
      if (comment.user.toString() === req.user.id) {
        Comment.findByIdAndRemove(req.params.commentId, (err, comment) => {
          return res.status(200).json(`sucessfully deleted comment`);
        });
      } else {
        return res
          .status(422)
          .json({
            invalidcredentials: `invalid credentials for deleting comment`,
          });
      }
    })
    .catch((err) => {
      return res
        .status(422)
        .json({ nocommentfound: `No comment found with that ID` });
    });
});

//reply to a comment
router.post("/:id/comments/:commentId", requireUser, async (req, res, next) => {
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
    comment = await comment
      .sort({ createdAt: -1 })
      .populate("author", "username");
    return res.json(comment);
  } catch (err) {
    next(err);
  }
});
//reply to a comment

module.exports = router;
