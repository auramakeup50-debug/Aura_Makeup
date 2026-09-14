const Producto = require('../models/Producto');

const validarProducto = (datos) => {
	const requeridos = ['nombre', 'tipo', 'categoria', 'precio', 'descripcion', 'imagen'];
	return requeridos.every((campo) => datos[campo] !== undefined && datos[campo] !== '');
};

const listarProductos = (req, res) => {
	try {
		res.json(Producto.listar());
	} catch (error) {
		console.error('Error al listar productos:', error);
		res.status(500).json({ mensaje: 'Error al obtener los productos' });
	}
};

const crearProducto = (req, res) => {
	try {
		if (!validarProducto(req.body)) return res.status(400).json({ mensaje: 'Completa todos los campos del producto' });
		const producto = Producto.crear({
			nombre: req.body.nombre,
			tipo: req.body.tipo,
			categoria: req.body.categoria,
			emoji: req.body.emoji || '✨',
			precio: Number(req.body.precio),
			descripcion: req.body.descripcion,
			imagen: req.body.imagen,
			opciones: req.body.opciones || null,
			posicion: Number(req.body.posicion) || 0
		});
		res.status(201).json(producto);
	} catch (error) {
		console.error('Error al crear producto:', error);
		res.status(500).json({ mensaje: 'Error al crear el producto' });
	}
};

const actualizarProducto = (req, res) => {
	try {
		if (!validarProducto(req.body)) return res.status(400).json({ mensaje: 'Completa todos los campos del producto' });
		if (!Producto.buscarPorId(req.params.id)) return res.status(404).json({ mensaje: 'Producto no encontrado' });
		res.json(Producto.actualizar(req.params.id, {
			nombre: req.body.nombre,
			tipo: req.body.tipo,
			categoria: req.body.categoria,
			emoji: req.body.emoji || '✨',
			precio: Number(req.body.precio),
			descripcion: req.body.descripcion,
			imagen: req.body.imagen,
			opciones: req.body.opciones || null,
			posicion: Number(req.body.posicion) || 0
		}));
	} catch (error) {
		console.error('Error al actualizar producto:', error);
		res.status(500).json({ mensaje: 'Error al actualizar el producto' });
	}
};

const eliminarProducto = (req, res) => {
	try {
		const resultado = Producto.eliminar(req.params.id);
		if (!resultado.changes) return res.status(404).json({ mensaje: 'Producto no encontrado' });
		res.json({ mensaje: 'Producto eliminado correctamente' });
	} catch (error) {
		console.error('Error al eliminar producto:', error);
		res.status(500).json({ mensaje: 'Error al eliminar el producto' });
	}
};

const reordenarProductos = (req, res) => {
	try {
		if (!Array.isArray(req.body.orden)) return res.status(400).json({ mensaje: 'El orden no es válido' });
		Producto.reordenar(req.body.orden);
		res.json(Producto.listar());
	} catch (error) {
		console.error('Error al ordenar productos:', error);
		res.status(500).json({ mensaje: 'Error al ordenar los productos' });
	}
};

module.exports = { listarProductos, crearProducto, actualizarProducto, eliminarProducto, reordenarProductos };
