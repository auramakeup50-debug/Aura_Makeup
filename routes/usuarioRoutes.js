const express = require('express');
const router = express.Router();

const autenticar = require('../middlewares/auth');
const usuarioController = require('../controllers/usuarioController');

// Obtener perfil
router.get('/perfil', autenticar, usuarioController.obtenerPerfil);

// Actualizar perfil
router.put('/perfil', autenticar, usuarioController.actualizarPerfil);

module.exports = router;