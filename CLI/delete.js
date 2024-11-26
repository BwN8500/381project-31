const mongoose = require('mongoose');
const { connectDB } = require('../db/db');

const deleteCollections = async (collectionNames) => {
    try {
        await connectDB();
        const collections = await mongoose.connection.db.listCollections().toArray();
        const existingCollections = collections.map(coll => coll.name);

        for (const collectionName of collectionNames) {
            if (existingCollections.includes(collectionName)) {
                await mongoose.connection.db.collection(collectionName).drop();
                console.log(`Collection "${collectionName}" has been deleted successfully.`);
            } else {
                console.log(`Collection "${collectionName}" does not exist.`);
            }
        }
    } catch (error) {
        console.error('Error deleting collections:', error);
    } finally {
        mongoose.connection.close();
    }
};

const collectionsToDelete = ['bookImages.files', 'bookImages.chunks', 'books'];
deleteCollections(collectionsToDelete);