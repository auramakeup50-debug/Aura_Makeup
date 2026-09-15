const db = require('../config/database');

const formatear = (consulta) => ({
	...consulta,
	respuesta: consulta.respuesta || null
});

const Asesoria = {
	listarPorUsuario: (usuarioId) => db.prepare(`
		SELECT id, metodo, pregunta, respuesta, estado, fecha_creacion, fecha_respuesta
		FROM asesorias WHERE usuario_id = ?
		ORDER BY datetime(fecha_creacion) DESC, id DESC
	`).all(usuarioId).map(formatear),

	listarTodas: () => db.prepare(`
		SELECT asesorias.id, asesorias.usuario_id, asesorias.metodo, asesorias.pregunta,
			asesorias.respuesta, asesorias.estado, asesorias.fecha_creacion, asesorias.fecha_respuesta,
			usuarios.nombre AS usuario_nombre, usuarios.correo AS usuario_correo
		FROM asesorias INNER JOIN usuarios ON usuarios.id = asesorias.usuario_id
		ORDER BY CASE asesorias.estado WHEN 'pendiente' THEN 0 ELSE 1 END,
			datetime(asesorias.fecha_creacion) DESC, asesorias.id DESC
	`).all().map(formatear),

	crear: (usuarioId, metodo, pregunta) => {
		const resultado = db.prepare(`INSERT INTO asesorias (usuario_id, metodo, pregunta) VALUES (?, ?, ?)`).run(usuarioId, metodo, pregunta);
		return db.prepare('SELECT id, metodo, pregunta, respuesta, estado, fecha_creacion, fecha_respuesta FROM asesorias WHERE id = ?').get(resultado.lastInsertRowid);
	},

	responder: (id, respuesta) => {
		const resultado = db.prepare(`UPDATE asesorias SET respuesta = ?, estado = 'respondida', fecha_respuesta = CURRENT_TIMESTAMP WHERE id = ?`).run(respuesta, id);
		return resultado.changes ? db.prepare(`SELECT asesorias.id, asesorias.usuario_id, asesorias.metodo, asesorias.pregunta, asesorias.respuesta, asesorias.estado, asesorias.fecha_creacion, asesorias.fecha_respuesta, usuarios.nombre AS usuario_nombre, usuarios.correo AS usuario_correo FROM asesorias INNER JOIN usuarios ON usuarios.id = asesorias.usuario_id WHERE asesorias.id = ?`).get(id) : null;
	}
};

module.exports = Asesoria;