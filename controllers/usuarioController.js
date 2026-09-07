const Usuario = require('../models/Usuario');

// Obtener perfil
const obtenerPerfil = (req, res) => {

    try {

        const usuario = Usuario.buscarPorId(req.usuario.id);

        if (!usuario) {
            return res.status(404).json({
                mensaje: 'Usuario no encontrado'
            });
        }

        res.json({
            usuario
        });

    } catch (error) {

        console.error('Error al obtener perfil:', error);

        res.status(500).json({
            mensaje: 'Error al obtener el perfil'
        });

    }
};


// Actualizar perfil
const actualizarPerfil = (req, res) => {

    try {

        const { nombre, correo } = req.body;

        if (!nombre || !correo) {
            return res.status(400).json({
                mensaje: 'Nombre y correo son obligatorios'
            });
        }

        const usuarioExistente = Usuario.buscarPorCorreo(correo);

        if (
            usuarioExistente &&
            usuarioExistente.id !== req.usuario.id
        ) {
            return res.status(400).json({
                mensaje: 'El correo ya está registrado'
            });
        }

        Usuario.actualizar(
            req.usuario.id,
            nombre,
            correo
        );

        const usuarioActualizado =
            Usuario.buscarPorId(req.usuario.id);

        res.json({
            mensaje: 'Perfil actualizado correctamente',
            usuario: usuarioActualizado
        });

    } catch (error) {

        console.error('Error al actualizar perfil:', error);

        res.status(500).json({
            mensaje: 'Error al actualizar el perfil'
        });

    }

};


module.exports = {
    obtenerPerfil,
    actualizarPerfil
};