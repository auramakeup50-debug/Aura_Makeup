const db = require('../config/database');

const listarUsuarios = (req, res) => {
	try {
		const usuarios = db.prepare(`
			SELECT id, nombre, correo, rol, fecha_registro
			FROM usuarios
			ORDER BY datetime(fecha_registro) DESC, id DESC
		`).all();
		res.json(usuarios);
	} catch (error) {
		console.error('Error al listar usuarios:', error);
		res.status(500).json({ mensaje: 'Error al obtener los usuarios' });
	}
};

module.exports = { listarUsuarios };
