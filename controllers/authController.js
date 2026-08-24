const bcrypt = require('bcrypt');
const Usuario = require('../models/Usuario');

const registrarUsuario = async (req, res) => {

    try {

        const { nombre, correo, password } = req.body;

        // Validar que los campos estén completos
        if (!nombre || !correo || !password) {

            return res.status(400).json({
                mensaje: 'Todos los campos son obligatorios'
            });

        }

        // Verificar si el correo ya existe
        const usuarioExistente = Usuario.buscarPorCorreo(correo);

        if (usuarioExistente) {

            return res.status(400).json({
                mensaje: 'El correo ya está registrado'
            });

        }

        // Cifrar contraseña
        const passwordCifrada = await bcrypt.hash(password, 10);

        // Crear usuario
        Usuario.crear(
            nombre,
            correo,
            passwordCifrada
        );

        res.status(201).json({
            mensaje: 'Usuario registrado correctamente'
        });

    } catch (error) {

        console.error('Error:', error);

        res.status(500).json({
            mensaje: 'Error al registrar el usuario'
        });

    }
};

module.exports = {
    registrarUsuario
};