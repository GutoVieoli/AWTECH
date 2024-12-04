const Joi = require('joi');


const UserEntity = Joi.object({
    email: Joi.string().email().required(), 
    senha: Joi.string().required()
});

const UpdateUserEntity = Joi.object({
    email: Joi.string().email().required(), 
    cargo: Joi.string().required()
});

module.exports = { 
    UserEntity,
    UpdateUserEntity
};