const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

const JWT_SECRET = process.env.JWT_SECRET || 'aura-makeup-clave-desarrollo';

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

const iniciarSesion = async (req, res) => {

    try {

        const { correo, password } = req.body;
        const usuario = Usuario.buscarPorCorreo(correo);

        if (!usuario || !(await bcrypt.compare(password, usuario.password))) {
            return res.status(401).json({
                mensaje: 'Correo o contraseña incorrectos'
            });
        }

        const token = jwt.sign(
            { id: usuario.id, nombre: usuario.nombre, rol: usuario.rol },
            JWT_SECRET,
            { expiresIn: '2h' }
        );

        res.json({
            mensaje: 'Inicio de sesión correcto',
            token,
            usuario: {
                id: usuario.id,
                nombre: usuario.nombre,
                correo: usuario.correo,
                rol: usuario.rol
            }
        });

    } catch (error) {

        console.error('Error al iniciar sesión:', error);
        res.status(500).json({
            mensaje: 'Error al iniciar sesión'
        });

    }
};

module.exports = {
    registrarUsuario,
    iniciarSesion
};