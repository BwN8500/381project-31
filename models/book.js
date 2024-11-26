const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    Description: {
        type: String,
    },
    stock: {
        type: Number,
        default: 1,
        required: true,
    },
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;