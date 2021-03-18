import mongoose, { Schema } from 'mongoose';

const UserSchema: Schema = new Schema({
    username: {
        type: String,
        required: true
    },
    level: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    totalPublications: {
        type: Number,
        required: true,
    },
    publications: {
        type: [ArrayBuffer]
    }
})

mongoose.model('User', UserSchema);

export default UserSchema;