const Kit = require('../models/Kit');
const Producto = require('../models/Producto');

const validarDatos = (datos) => {
	if (!datos.nombre || !datos.descripcion || !datos.imagen || !Number.isFinite(Number(datos.precio)) || Number(datos.precio) < 0 || !Array.isArray(datos.productos) || !datos.productos.length) return false;
	return datos.productos.every((id) => Producto.buscarPorId(id));
};

const listarKits = (req, res) => {
	try { res.json(Kit.listar(true).filter((kit) => kit.disponible)); } catch (error) { console.error('Error al listar kits:', error); res.status(500).json({ mensaje: 'Error al obtener los kits' }); }
};

const listarTodos = (req, res) => {
	try { res.json(Kit.listar(false)); } catch (error) { console.error('Error al listar kits para administración:', error); res.status(500).json({ mensaje: 'Error al obtener los kits' }); }
};

const crearKit = (req, res) => {
	try {
		if (!validarDatos(req.body)) return res.status(400).json({ mensaje: 'Completa los datos y selecciona productos válidos' });
		res.status(201).json(Kit.crear({ nombre: req.body.nombre.trim(), descripcion: req.body.descripcion.trim(), precio: Number(req.body.precio), imagen: req.body.imagen.trim(), activo: req.body.activo !== false, productos: req.body.productos.map(Number) }));
	} catch (error) { console.error('Error al crear kit:', error); res.status(500).json({ mensaje: 'No se pudo crear el kit' }); }
};

const actualizarKit = (req, res) => {
	try {
		if (!Kit.buscarPorId(req.params.id)) return res.status(404).json({ mensaje: 'Kit no encontrado' });
		if (!validarDatos(req.body)) return res.status(400).json({ mensaje: 'Completa los datos y selecciona productos válidos' });
		res.json(Kit.actualizar(req.params.id, { nombre: req.body.nombre.trim(), descripcion: req.body.descripcion.trim(), precio: Number(req.body.precio), imagen: req.body.imagen.trim(), activo: req.body.activo !== false, productos: req.body.productos.map(Number) }));
	} catch (error) { console.error('Error al actualizar kit:', error); res.status(500).json({ mensaje: 'No se pudo actualizar el kit' }); }
};

const cambiarActivo = (req, res) => {
	try { const kit = Kit.actualizarActivo(req.params.id, req.body.activo); if (!kit) return res.status(404).json({ mensaje: 'Kit no encontrado' }); res.json(kit); } catch (error) { res.status(500).json({ mensaje: 'No se pudo cambiar el estado del kit' }); }
};

module.exports = { listarKits, listarTodos, crearKit, actualizarKit, cambiarActivo };