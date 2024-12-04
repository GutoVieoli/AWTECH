const { createAccount, login, updateRole } = require('../services/user_service');
const { UserEntity, UpdateUserEntity } = require('../entities/user_entity');

const createAccountController = async (req, res) => {
    try {
        const { error, value } = UserEntity.validate(req.body);

        if (error) {
            return res.status(400).send({ message: error.details[0].message });
        }

        const { email, senha } = value;
        const result = await createAccount(email, senha);
        res.status(201).send(result);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

const loginController = async (req, res) => {
    try {
        const { error, value } = UserEntity.validate(req.body);

        if (error) {
            return res.status(400).send({ message: error.details[0].message });
        }

        const { email, senha } = value;
        const result = await login(email, senha);
        res.status(200).send(result);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

const updateRoleController = async (req, res) => {
    try {
        const { error, value } = UpdateUserEntity.validate(req.body);

        if (error) {
            return res.status(400).send({ message: error.details[0].message });
        }

        const id_do_solicitante = req.user.id;
        const { email, cargo } = value;
        const result = await updateRole(email, cargo, id_do_solicitante)
        res.status(200).send(result);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

module.exports = {
    createAccountController,
    loginController,
    updateRoleController
};
