const { insertBook, getBooks, deleteBooks, updateBook } = require('../services/books_service');
const { InsertBookEntity, GetBooksEntity, DeleteBooksEntity, UpdateBookEntity } = require('../entities/books_entity');

const insertBookController = async (req, res) => {
    try {
        const { error, value } = InsertBookEntity.validate(req.body);

        if (error) {
            return res.status(400).send({ message: error.details[0].message });
        }

        const id_do_solicitante = req.user.id;
        const { nome, autor, editora, ano } = value;

        const result = await insertBook(nome, autor, editora, ano, id_do_solicitante);
        res.status(201).send(result);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

const getBooksController = async (req, res) => {
    try {
        const { error, value } = GetBooksEntity.validate(req.body);

        if (error) {
            return res.status(400).send({ message: error.details[0].message });
        }

        const { offset, limit, filter } = value;

        const result = await getBooks(limit, offset, filter);
        res.status(200).send(result);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

const deleteBooksController = async (req, res) => {
    try {
        const { error, value } = DeleteBooksEntity.validate(req.body);

        if (error) {
            return res.status(400).send({ message: error.details[0].message });
        }

        const { id } = value;
        const id_do_solicitante = req.user.id;

        const result = await deleteBooks(id, id_do_solicitante)
        res.status(200).send(result);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

const updateBooksController = async (req, res) => {
    try {
        const { error, value } = UpdateBookEntity.validate(req.body);

        if (error) {
            return res.status(400).send({ message: error.details[0].message });
        }

        const { id } = value;
        const id_do_solicitante = req.user.id;

        const result = await updateBook(id, value, id_do_solicitante);
        res.status(200).send(result);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};




module.exports = {
    insertBookController,
    getBooksController,
    deleteBooksController,
    updateBooksController
};

