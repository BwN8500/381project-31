const mongoose = require('mongoose');
require('dotenv').config();

let bucket;

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB connected');
        bucket = new mongoose.mongo.GridFSBucket(connection.connection.db, {
            bucketName: 'bookImages',
        });
    } catch (err) {
        console.error('MongoDB connection error:', err);
    }
};

const getBucket = () => {
    if (!bucket) {
        throw new Error('Bucket is not initialized');
    }
    return bucket;
};

module.exports = {
    connectDB,
    getBucket,
};