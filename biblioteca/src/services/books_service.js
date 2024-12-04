const crypto = require('crypto');
const { getRoleById } = require('../repositories/user_repository');
const { getSpecificBook, createNewBook, listBooks, deleteBookById, updateBookById } = require('../repositories/books_repository');


const insertBook = async (nome, autor, editora, ano, id_do_solicitante) => {
    const id = crypto.randomUUID();
    nome = nome.toUpperCase();
    autor = autor.toUpperCase();
    editora = editora.toUpperCase();

    const role = await getRoleById(id_do_solicitante)
    if (role?.cargo !== 'administrador') {
        throw new Error('Usuário sem permissões para inserir livros.');
    }

    if (await getSpecificBook(nome, autor, editora, ano)) {
        throw new Error('Esse livro informado já está cadastrado.');
    }

    await createNewBook(id, nome, autor, editora, ano);
    return { message: 'Livro criado com sucesso!' };
};

const getBooks = async (limit, offset, filter) => {
    books = await listBooks(limit, offset, filter)
    return books
}

const deleteBooks = async(id_livro, id_do_solicitante) => {

    const role = await getRoleById(id_do_solicitante)
    if (role?.cargo !== 'administrador') {
        throw new Error('Usuário sem permissões para deletar livros.');
    }

    result = await deleteBookById(id_livro)
    return result
}


const updateBook = async (id, value, id_do_solicitante) => {

    const role = await getRoleById(id_do_solicitante)
    if (role?.cargo !== 'administrador') {
        throw new Error('Usuário sem permissões para atualizar livros.');
    }

    await updateBookById(id, value);
    return { message: 'Livro atualizado com sucesso!' };
};

module.exports = {
    insertBook,
    getBooks,
    deleteBooks,
    updateBook
};