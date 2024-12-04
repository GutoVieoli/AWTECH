const express = require('express');

const { validaToken } = require('../auth/autenticacao')
const { 
    createAccountController, 
    loginController, 
    updateRoleController 
} = require('../controllers/user_controller');

const router = express.Router();

router.post('/create_user', createAccountController);
router.post('/login', loginController);
router.put('/update_role', validaToken, updateRoleController)

module.exports = {
    router
};