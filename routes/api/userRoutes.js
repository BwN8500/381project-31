const express = require('express');
const multer = require('multer');
const { getAllUsers, getUserById, createUser, updateUser, deleteUser, getUser } = require('../../controllers/userController');
const { verifyRole } = require('../../middleware/verify');
const upload = multer();

const router = express.Router();

router.get('/', verifyRole("admin"), getAllUsers);

router.get('/user', verifyRole("user"), getUser);

router.get('/:id', verifyRole("admin"), getUserById);

router.post('/create', verifyRole("admin"), upload.none(), createUser);

router.put('/update/:id', verifyRole("admin"), upload.none(), updateUser);

router.delete('/delete/:id', verifyRole("admin"), deleteUser);

module.exports = router;