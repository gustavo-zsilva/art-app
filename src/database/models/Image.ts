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
    }
});

export default ImageSchema;