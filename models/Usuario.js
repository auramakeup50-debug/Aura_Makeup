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
    }

};

module.exports = Usuario;