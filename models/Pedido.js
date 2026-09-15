const db = require('../config/database');

const Pedido = {
	crear: (usuarioId, datos) => {
		const numero = `AM-${Date.now().toString().slice(-8)}`;
		const resultado = db.prepare(`
			INSERT INTO pedidos
			(numero, usuario_id, estado, metodo_pago, nombre_receptor, direccion, fecha_maxima, total, productos)
			VALUES (?, ?, 'pendiente', ?, ?, ?, ?, ?, ?)
		`).run(numero, usuarioId, datos.metodoPago, datos.nombre, datos.direccion, datos.fechaEntrega, datos.total, JSON.stringify(datos.productos));
		return Pedido.buscarPorIdDeUsuario(resultado.lastInsertRowid, usuarioId);
	},

	listarPorUsuario: (usuarioId) => db.prepare(`
		SELECT id, numero, fecha_pedido, estado, metodo_pago, nombre_receptor, direccion, fecha_maxima, total, productos
		FROM pedidos
		WHERE usuario_id = ?
		ORDER BY datetime(fecha_pedido) DESC, id DESC
	`).all(usuarioId).map(Pedido.formatear),

	listarTodos: () => db.prepare(`
		SELECT pedidos.id, pedidos.numero, pedidos.fecha_pedido, pedidos.estado, pedidos.metodo_pago,
			pedidos.nombre_receptor, pedidos.direccion, pedidos.fecha_maxima, pedidos.total, pedidos.productos,
			usuarios.nombre AS usuario_nombre, usuarios.correo AS usuario_correo
		FROM pedidos
		INNER JOIN usuarios ON usuarios.id = pedidos.usuario_id
		ORDER BY datetime(pedidos.fecha_pedido) DESC, pedidos.id DESC
	`).all().map(Pedido.formatear),

	buscarPorId: (id) => {
		const pedido = db.prepare(`
			SELECT pedidos.id, pedidos.numero, pedidos.fecha_pedido, pedidos.estado, pedidos.metodo_pago,
				pedidos.nombre_receptor, pedidos.direccion, pedidos.fecha_maxima, pedidos.total, pedidos.productos,
				usuarios.nombre AS usuario_nombre, usuarios.correo AS usuario_correo
			FROM pedidos
			INNER JOIN usuarios ON usuarios.id = pedidos.usuario_id
			WHERE pedidos.id = ?
		`).get(id);
		return pedido ? Pedido.formatear(pedido) : null;
	},

	actualizarEstado: (id, estado) => {
		const resultado = db.prepare('UPDATE pedidos SET estado = ? WHERE id = ?').run(estado, id);
		return resultado.changes > 0 ? Pedido.buscarPorId(id) : null;
	},

	buscarPorIdDeUsuario: (id, usuarioId) => {
		const pedido = db.prepare(`
			SELECT id, numero, fecha_pedido, estado, metodo_pago, nombre_receptor, direccion, fecha_maxima, total, productos
			FROM pedidos WHERE id = ? AND usuario_id = ?
		`).get(id, usuarioId);
		return pedido ? Pedido.formatear(pedido) : null;
	},

	formatear: (pedido) => ({ ...pedido, productos: JSON.parse(pedido.productos || '[]') })
};

module.exports = Pedido;
