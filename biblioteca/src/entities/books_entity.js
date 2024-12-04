const Joi = require('joi');

const InsertBookEntity = Joi.object({
    nome: Joi.string().required(), 
    autor: Joi.string().required(),
    editora: Joi.string().required(), 
    ano: Joi.number()
        .integer()
        .max(new Date().getFullYear())
        .required()
});

const GetBooksEntity = Joi.object({
    offset: Joi.number().integer().default(0), 
    limit: Joi.number().integer().default(10),
    filter: Joi.string().valid('nome', 'autor', 'editora', 'ano').default('nome')
});

const DeleteBooksEntity = Joi.object({
    id: Joi.string().required()
});

const UpdateBookEntity = Joi.object({
    id: Joi.string().required(),
    nome: Joi.string().optional().uppercase(),
    autor: Joi.string().optional().uppercase(),
    editora: Joi.string().optional().uppercase(),
    ano: Joi.number()
        .integer()
        .max(new Date().getFullYear())
        .optional()
}).min(2); 


module.exports = { 
    InsertBookEntity,
    GetBooksEntity,
    DeleteBooksEntity,
    UpdateBookEntity
};