import { Schema } from 'mongoose';

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

export default UserSchema;