const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ObjectId = Schema.ObjectId

const noReqString = {
    type: String,
    required: false
}
const itemsSchema = Schema(
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

const postSchema = Schema({
    author: {
        type: ObjectId,
        required: true,
        ref: "User"
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true,
    },
    items: [itemsSchema],
    imageUrl: { type: String },
},{
    timestamps: true,
})
module.exports = mongoose.model('Post', postSchema);