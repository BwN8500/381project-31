const express = require('express');
const { image } = require('../../controllers/bookImgController');
const { verifyRole } = require('../../middleware/verify');

const router = express.Router();

router.get('/:bookId', verifyRole("user"), image);

module.exports = router;
