import mongoose, { Schema } from 'mongoose';

const ImageSchema: Schema = new Schema({
    img: {
        path: String,
        contentType: String,
    },
    author: String,
    votes: {
        upvotes: Number,
        downvotes: Number,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }
});

export default ImageSchema;