const db = require('../config/database');
const Producto = require('./Producto');

const seleccionar = `
	SELECT id, nombre, descripcion, precio, imagen, activo, productos, fecha_creacion
	FROM kits
`;

const formatear = (kit) => {
	const ids = JSON.parse(kit.productos || '[]').map(Number);
	const incluidos = ids.map((id) => Producto.buscarPorId(id)).filter(Boolean);
	return { ...kit, activo: Boolean(kit.activo), disponible: ids.length > 0 && incluidos.length === ids.length, productos: ids, incluidos };
};

const Kit = {
	listar: (soloActivos = true) => db.prepare(`${seleccionar}${soloActivos ? 'WHERE activo = 1' : ''} ORDER BY id DESC`).all().map(formatear),

	buscarPorId: (id) => {
		const kit = db.prepare(`${seleccionar}WHERE id = ?`).get(id);
		return kit ? formatear(kit) : null;
	},

	crear: (datos) => {
		const resultado = db.prepare(`INSERT INTO kits (nombre, descripcion, precio, imagen, activo, productos) VALUES (@nombre, @descripcion, @precio, @imagen, @activo, @productos)`).run({ ...datos, productos: JSON.stringify(datos.productos) });
		return Kit.buscarPorId(resultado.lastInsertRowid);
	},

	actualizar: (id, datos) => {
		db.prepare(`UPDATE kits SET nombre = @nombre, descripcion = @descripcion, precio = @precio, imagen = @imagen, activo = @activo, productos = @productos WHERE id = @id`).run({ ...datos, id, productos: JSON.stringify(datos.productos) });
		return Kit.buscarPorId(id);
	},

	actualizarActivo: (id, activo) => {
		db.prepare('UPDATE kits SET activo = ? WHERE id = ?').run(activo ? 1 : 0, id);
		return Kit.buscarPorId(id);
	}
};

module.exports = Kit;