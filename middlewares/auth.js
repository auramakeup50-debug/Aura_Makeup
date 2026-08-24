const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'aura-makeup-clave-desarrollo';

const autenticar = (req, res, next) => {
	const cabecera = req.headers.authorization;
	const token = cabecera && cabecera.startsWith('Bearer ')
		? cabecera.slice(7)
		: null;

	if (!token) {
		return res.status(401).json({ mensaje: 'Autenticación requerida' });
	}

	try {
		req.usuario = jwt.verify(token, JWT_SECRET);
		next();
	} catch (error) {
		res.status(401).json({ mensaje: 'Token inválido o expirado' });
	}
};

module.exports = autenticar;
