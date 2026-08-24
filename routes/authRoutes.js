const express = require('express');

const router = express.Router();

const authController = require('../controllers/authController');

// Registro
router.post('/registro', authController.registrarUsuario);

// Inicio de sesión
router.post('/login', authController.iniciarSesion);

module.exports = router;