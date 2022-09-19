const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = Schema({
    title: {
        type: string,
        required: true
    },
    body: {
        type: string,
        required: false
    },
    items: {
        type: [string],
        required: true,
        ref: "Item"
    },
    author: {
        type: ObjectId,
        required: true,
        ref: "User"
    }
})