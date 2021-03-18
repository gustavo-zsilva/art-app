import mongoose from 'mongoose';

let isConnected: Number = 0;

export default async function connectToDatabase(uri: string) {

    if (isConnected === 2) return;

    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connected to Database Successfully.'))
    .catch(err => console.error(err))

    const db = mongoose.connection;
    
    isConnected = db.readyState;

    return db;
}