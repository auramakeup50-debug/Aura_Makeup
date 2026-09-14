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
