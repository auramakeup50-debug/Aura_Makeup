const Pedido = require('../models/Pedido');

const listarMisPedidos = (req, res) => {
	try {
		res.json(Pedido.listarPorUsuario(req.usuario.id));
	} catch (error) {
		console.error('Error al listar pedidos:', error);
		res.status(500).json({ mensaje: 'Error al obtener el historial' });
	}
};

const obtenerPedido = (req, res) => {
	try {
		const pedido = Pedido.buscarPorIdDeUsuario(req.params.id, req.usuario.id);
		if (!pedido) return res.status(404).json({ mensaje: 'Pedido no encontrado' });
		res.json(pedido);
	} catch (error) {
		console.error('Error al obtener pedido:', error);
		res.status(500).json({ mensaje: 'Error al obtener el pedido' });
	}
};

const crearPedido = (req, res) => {
	try {
		const { productos, metodoPago, nombre, direccion, fechaEntrega, total } = req.body;
		if (!Array.isArray(productos) || !productos.length || !metodoPago || !nombre || !direccion || !fechaEntrega || !Number.isFinite(Number(total))) {
			return res.status(400).json({ mensaje: 'Completa la información del pedido' });
		}
		const pedido = Pedido.crear(req.usuario.id, { productos, metodoPago, nombre, direccion, fechaEntrega, total: Number(total) });
		res.status(201).json({ mensaje: 'Pedido enviado correctamente', pedido });
	} catch (error) {
		console.error('Error al crear pedido:', error);
		res.status(500).json({ mensaje: 'No se pudo registrar el pedido' });
	}
};

module.exports = { listarMisPedidos, obtenerPedido, crearPedido };
