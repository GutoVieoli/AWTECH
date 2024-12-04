const db = require('./db');
const Sequelize = require('sequelize');  

const books = db.define('books', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    autor: {
        type: Sequelize.STRING,
        allowNull: false
    },
    editora: {
        type: Sequelize.STRING,
        allowNull: false
    },
    ano: {
        type: Sequelize.INTEGER,
        allowNull: false
    }

}, {
    tableName: 'books',
    timestamps: false      // Se não utilizar os campos createdAt e updatedAt
});


books.sync();

module.exports = books;
