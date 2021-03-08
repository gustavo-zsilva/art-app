import mongoose from 'mongoose';

export default function connectToDatabase(uri: string) {
    mongoose.connect(uri, {
        
    })

    const db = mongoose.connection;
}