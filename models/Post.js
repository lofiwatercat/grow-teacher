const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ObjectId = Schema.ObjectId

const noReqString = {
    type: String,
    required: false
}
const itemsSchema = new Schema(
    {
        name: String,
        totalCost: Number,
        amount: Number,
        details: noReqString,
        status: Boolean,
    },
    {
        timestamps: true
    },
)

const postSchema = new Schema({
    author: {
        type: ObjectId,
        required: true,
        ref: "User"
    },
    comments: [{
        type: ObjectId,
        required: false,
        ref: "Comment"
    }],
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    items: [itemsSchema],
},{
    timestamps: true
})
module.exports = mongoose.model('Post', postSchema);