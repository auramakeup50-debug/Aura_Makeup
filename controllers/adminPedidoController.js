const Pedido = require('../models/Pedido');

const ESTADOS = new Set(['pendiente', 'confirmado', 'enviado', 'entregado', 'cancelado']);

const listarPedidos = (req, res) => {
	try {
		res.json(Pedido.listarTodos());
	} catch (error) {
		console.error('Error al listar pedidos para administración:', error);
		res.status(500).json({ mensaje: 'Error al obtener los pedidos' });
	}
};

const obtenerPedido = (req, res) => {
	try {
		const pedido = Pedido.buscarPorId(req.params.id);
		if (!pedido) return res.status(404).json({ mensaje: 'Pedido no encontrado' });
		res.json(pedido);
	} catch (error) {
		console.error('Error al obtener pedido para administración:', error);
		res.status(500).json({ mensaje: 'Error al obtener el pedido' });
	}
};

const actualizarEstado = (req, res) => {
	try {
		if (!ESTADOS.has(req.body.estado)) return res.status(400).json({ mensaje: 'Estado de pedido no válido' });
		const pedido = Pedido.actualizarEstado(req.params.id, req.body.estado);
		if (!pedido) return res.status(404).json({ mensaje: 'Pedido no encontrado' });
		res.json({ mensaje: 'Estado actualizado correctamente', pedido });
	} catch (error) {
		console.error('Error al actualizar estado del pedido:', error);
		res.status(500).json({ mensaje: 'No se pudo actualizar el estado' });
	}
};

module.exports = { listarPedidos, obtenerPedido, actualizarEstado };
