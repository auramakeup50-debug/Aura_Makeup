const express = require('express');
const router = express.Router();
const autenticar = require('../middlewares/auth');
const permitirRoles = require('../middlewares/roles');
const controller = require('../controllers/asesoriaController');

router.use(autenticar);
router.get('/mis-consultas', controller.listarMisConsultas);
router.post('/', controller.crearConsulta);
router.get('/admin', permitirRoles('admin'), controller.listarConsultasAdmin);
router.patch('/:id/respuesta', permitirRoles('admin'), controller.responderConsulta);

module.exports = router;