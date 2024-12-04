const users  = require('../models/user_model')


const getUserByEmail = async (email) => {
    return await users.findOne({
        where: { email } 
    } );
};

const createUser = async (id, email, senha, salt) => {
    return await users.create({
        id,
        email,
        senha,
        salt,
    });
};

const getRoleById = async (id) => {
    return await users.findOne({
        where: { id } ,
        attributes: ['email', 'cargo']
    } );
}

const updateUserRole = async (email, cargo) => {
    try {
        await users.update(
            { 
                cargo 
            }, 
            {
                where: { email } 
            }
        );

        return { message: 'Cargo atualizado com sucesso.' };
    } catch (error) {
        throw new Error(`Erro ao atualizar o cargo: ${error.message}`);
    }
}


module.exports = { 
    getUserByEmail,
    createUser,
    getRoleById,
    updateUserRole
 };
