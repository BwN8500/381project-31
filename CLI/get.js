const mongoose = require('mongoose');
const { connectDB } = require('../db/db');

const getAllDataFromCollections = async () => {
    try {
        await connectDB();

        const collections = await mongoose.connection.db.listCollections().toArray();

        for (const collection of collections) {
            const modelName = collection.name.charAt(0).toUpperCase() + collection.name.slice(1);
            const Model = mongoose.model(modelName, new mongoose.Schema({}, { strict: false }), collection.name);

            const data = await Model.find({});
            console.log(`Data from collection "${collection.name}":`, data);
        }
    } catch (error) {
        console.error('Error retrieving data from collections:', error);
    } finally {
        mongoose.connection.close();
    }
};

getAllDataFromCollections();