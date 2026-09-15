const Asesoria = require('../models/Asesoria');

const crearConsulta = (req, res) => {
	try {
		const { metodo, pregunta } = req.body;
		if (!['chat', 'formulario'].includes(metodo) || !pregunta || pregunta.trim().length < 10) return res.status(400).json({ mensaje: 'Elige un método y escribe una pregunta de al menos 10 caracteres' });
		res.status(201).json({ mensaje: 'Tu consulta fue enviada al equipo Aura', consulta: Asesoria.crear(req.usuario.id, metodo, pregunta.trim()) });
	} catch (error) { console.error('Error al crear asesoría:', error); res.status(500).json({ mensaje: 'No se pudo enviar la consulta' }); }
};

const listarMisConsultas = (req, res) => {
	try { res.json(Asesoria.listarPorUsuario(req.usuario.id)); } catch (error) { console.error('Error al listar asesorías:', error); res.status(500).json({ mensaje: 'No se pudo cargar el historial de asesorías' }); }
};

const listarConsultasAdmin = (req, res) => {
	try { res.json(Asesoria.listarTodas()); } catch (error) { console.error('Error al listar asesorías para admin:', error); res.status(500).json({ mensaje: 'No se pudo cargar las consultas' }); }
};

const responderConsulta = (req, res) => {
	try {
		if (!req.body.respuesta || req.body.respuesta.trim().length < 5) return res.status(400).json({ mensaje: 'Escribe una respuesta válida' });
		const consulta = Asesoria.responder(req.params.id, req.body.respuesta.trim());
		if (!consulta) return res.status(404).json({ mensaje: 'Consulta no encontrada' });
		res.json({ mensaje: 'Respuesta guardada', consulta });
	} catch (error) { console.error('Error al responder asesoría:', error); res.status(500).json({ mensaje: 'No se pudo guardar la respuesta' }); }
};

module.exports = { crearConsulta, listarMisConsultas, listarConsultasAdmin, responderConsulta };