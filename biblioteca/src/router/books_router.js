const express = require('express');

const { validaToken } = require('../auth/autenticacao')
const { 
    insertBookController,
    getBooksController,
    deleteBooksController,
    updateBooksController
} = require('../controllers/books_controller');

const router = express.Router();

router.post('/create', validaToken, insertBookController);
router.get('/list', validaToken, getBooksController);
router.delete('/delete', validaToken, deleteBooksController);
router.put('/update', validaToken, updateBooksController)

module.exports = {
    router
};