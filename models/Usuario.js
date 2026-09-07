const db = require('../config/database');

const Usuario = {

    // Buscar usuario por correo
    buscarPorCorreo: (correo) => {

        const sql = `
            SELECT *
            FROM usuarios
            WHERE correo = ?
        `;

        return db.prepare(sql).get(correo);
    },

    // Buscar usuario por ID
    buscarPorId: (id) => {

        const sql = `
            SELECT id, nombre, correo, rol, fecha_registro
            FROM usuarios
            WHERE id = ?
        `;

        return db.prepare(sql).get(id);
    },

    // Crear usuario
    crear: (nombre, correo, password) => {

        const sql = `
            INSERT INTO usuarios
            (nombre, correo, password, rol)
            VALUES (?, ?, ?, 'usuario')
        `;

        return db
            .prepare(sql)
            .run(nombre, correo, password);
    },

    // Actualizar perfil
    actualizar: (id, nombre, correo) => {

        const sql = `
            UPDATE usuarios
            SET nombre = ?, correo = ?
            WHERE id = ?
        `;

        return db
            .prepare(sql)
            .run(nombre, correo, id);
    }

};

module.exports = Usuario;