const express = require('express');

const router = express.Router();

const authController = require('../controllers/authController');

// Registro
router.post('/registro', authController.registrarUsuario);

module.exports = router;