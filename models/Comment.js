const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ObjectId = Schema.ObjectId;

const authorId = {
    type: ObjectId,
    required: true,
    ref: 'User'
}

const repliesSchema = new Schema({
        
        author: authorId,
        body: {
            type: String,
            // required: true,
       },
    },
       {
        timestamps: true
    },
)

const commentSchema = new Schema({
  author: {
    type: ObjectId,
    required: true,
    ref: "User"
  },
  username: {
    type: String,
    required: true 
  },
  post: {
    type: ObjectId,
    required: true,
    ref: "Post"
  },
  body: {
    type: String,
    required: true
  },
  replies: [repliesSchema],
}, {
  timestamps: true
})

module.exports = mongoose.model('Comment', commentSchema);
