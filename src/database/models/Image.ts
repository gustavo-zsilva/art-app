import mongoose, { Schema } from 'mongoose';

const ImageSchema: Schema = new Schema({
    img: {
        path: String,
        contentType: String,
    }
});

export default ImageSchema;