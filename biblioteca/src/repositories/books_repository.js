const books  = require('../models/books_model')


const getSpecificBook = async (nome, autor, editora, ano) => {
    return await books.findOne({
        where: { nome, autor, editora, ano } 
    } );
};

const createNewBook = async (id, nome, autor, editora, ano) => {
    return await books.create({
        id,
        nome,
        autor,
        editora,
        ano,
    });
};

const listBooks = async (limit, offset, filter) => {
    return await books.findAll({
        limit, 
        offset, 
        order: [[filter, 'ASC']] 
    });
};

const deleteBookById = async (id) => {
    try {
        const result = await books.destroy({
            where: { id } 
        });

        if (result === 0) {
            throw new Error('Livro não encontrado.');
        }

        return { message: 'Livro deletado com sucesso.' };
    } catch (error) {
        throw new Error(`Erro ao deletar o livro: ${error.message}`);
    }
};

const updateBookById = async (id, updateFields) => {
    try {
        const validFields = Object.keys(updateFields).reduce((acc, key) => {
            if (updateFields[key] !== undefined) {
                acc[key] = updateFields[key];
            }
            return acc;
        }, {});


        const result = await books.update(validFields, {
            where: { id }
        });

        if (result[0] === 0) {
            throw new Error('Livro não encontrado ou nenhum campo foi atualizado.');
        }

        return { message: 'Livro atualizado com sucesso.' };
    } catch (error) {
        throw new Error(`Erro ao atualizar o livro: ${error.message}`);
    }
};


module.exports = { 
    getSpecificBook,
    createNewBook,
    listBooks,
    deleteBookById,
    updateBookById
 };
