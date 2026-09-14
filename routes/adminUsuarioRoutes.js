const express = require('express');
const router = express.Router();

const autenticar = require('../middlewares/auth');
const permitirRoles = require('../middlewares/roles');
const adminUsuarioController = require('../controllers/adminUsuarioController');

router.get('/', autenticar, permitirRoles('admin'), adminUsuarioController.listarUsuarios);

module.exports = router;
