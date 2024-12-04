const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { getUserByEmail, createUser, getRoleById, updateUserRole } = require('../repositories/user_repository');
const { gerarToken } = require('../auth/autenticacao');

const createAccount = async (email, senha) => {
    const id = crypto.randomUUID();
    const salt = bcrypt.genSaltSync();
    const senhaHash = bcrypt.hashSync(senha, salt);

    if (await getUserByEmail(email)) {
        throw new Error('Esse email já está cadastrado.');
    }

    await createUser(id, email, senhaHash, salt);
    return { message: 'Usuário criado com sucesso!' };
};


const login = async (email, senha) => {
    const user = await getUserByEmail(email);
    if (!user) {
        throw new Error('Usuário não encontrado.');
    }

    const salt = user.salt;
    const senhaBD = user.senha;
    const nome = user.nome;
    const id = user.id;

    if (bcrypt.hashSync(senha, salt) === senhaBD) {
        const jwt = gerarToken(id, nome)
        return { 
            message: 'Login bem-sucedido',
            jwt
        };
    } else {
        throw new Error('Senha incorreta.');
    }
};

const updateRole = async (email, novoCargo, id_do_solicitante) => {

    const role = await getRoleById(id_do_solicitante)
    if (role?.cargo !== 'administrador') {
        throw new Error('Usuário sem permissões para atualizar cargos.');
    }
    if (role?.email === email) {
        throw new Error('Não é permitido atualizar o próprio cargo.');
    }
    if (! await getUserByEmail(email)) {
        throw new Error('Email de usuário passado é inexistente.');
    }

    await updateUserRole(email, novoCargo);
    return { message: 'Cargo do usuário atualizado com sucesso!' };
};

module.exports = {
    createAccount,
    login,
    updateRole
};