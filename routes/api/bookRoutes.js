const express = require('express');
const { upload } = require('../../controllers/imageController');
const { uploadBookImg } = require('../../controllers/bookImgController');
const { createBook, getAllBooks, getBookById, updateBook, deleteBook } = require('../../controllers/bookController');
const { verifyRole } = require('../../middleware/verify');

const router = express.Router();

router.post('/create', verifyRole("user"), upload.single('image'), createBook, uploadBookImg);

router.get('/', verifyRole("user"), getAllBooks);

router.get('/:id', verifyRole("user"), getBookById);

router.put('/edit/:id', verifyRole("user"), upload.single('image'), updateBook, uploadBookImg);

router.delete('/delete/:id', verifyRole("user"), deleteBook);

module.exports = router;