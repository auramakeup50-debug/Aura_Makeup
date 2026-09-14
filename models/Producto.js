const db = require('../config/database');

const Producto = {
	listar: () => db.prepare(`
		SELECT * FROM productos
		ORDER BY categoria, posicion, id
	`).all().map((producto) => ({
		...producto,
		opciones: producto.opciones ? JSON.parse(producto.opciones) : null
	})),

	buscarPorId: (id) => {
		const producto = db.prepare('SELECT * FROM productos WHERE id = ?').get(id);
		return producto ? { ...producto, opciones: producto.opciones ? JSON.parse(producto.opciones) : null } : null;
	},

	crear: (datos) => {
		const resultado = db.prepare(`
			INSERT INTO productos
			(nombre, tipo, categoria, emoji, precio, descripcion, imagen, opciones, posicion)
			VALUES (@nombre, @tipo, @categoria, @emoji, @precio, @descripcion, @imagen, @opciones, @posicion)
		`).run({ ...datos, opciones: datos.opciones ? JSON.stringify(datos.opciones) : null });
		return Producto.buscarPorId(resultado.lastInsertRowid);
	},

	actualizar: (id, datos) => {
		db.prepare(`
			UPDATE productos
			SET nombre = @nombre, tipo = @tipo, categoria = @categoria,
				emoji = @emoji, precio = @precio, descripcion = @descripcion,
				imagen = @imagen, opciones = @opciones, posicion = @posicion
			WHERE id = @id
		`).run({ ...datos, id, opciones: datos.opciones ? JSON.stringify(datos.opciones) : null });
		return Producto.buscarPorId(id);
	},

	eliminar: (id) => db.prepare('DELETE FROM productos WHERE id = ?').run(id),

	reordenar: (orden) => {
		const actualizar = db.prepare('UPDATE productos SET posicion = ? WHERE id = ?');
		const transaccion = db.transaction((ids) => ids.forEach((id, posicion) => actualizar.run(posicion, id)));
		transaccion(orden);
	}
};

module.exports = Producto;
