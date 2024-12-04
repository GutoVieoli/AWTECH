const db = require('./db');
const Sequelize = require('sequelize');  

const users = db.define('users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    cargo: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'visualizador',  // Valor padrão para o cargo
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false
    },
    salt: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    tableName: 'users',
    timestamps: false      // Se não utilizar os campos createdAt e updatedAt
});


users.sync();

module.exports = users;
