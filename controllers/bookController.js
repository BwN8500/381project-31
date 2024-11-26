const Book = require('../models/book');

exports.createBook = async (req, res, next) => {
    try {
        console.log(req.body);
        const book = new Book(req.body);
        await book.save();
        req.bookId = book._id;
        next();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ error: 'Book not found' });
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateBook = async (req, res, next) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!book) return res.status(404).json({ error: 'Book not found' });
        req.bookId = book._id;
        next();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) return res.status(404).json({ error: 'Book not found' });
        return res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
