const express = require('express');
const router = express.Router();

const autenticar = require('../middlewares/auth');
const pedidoController = require('../controllers/pedidoController');

router.use(autenticar);
router.get('/mis-pedidos', pedidoController.listarMisPedidos);
router.get('/:id', pedidoController.obtenerPedido);
router.post('/', pedidoController.crearPedido);

module.exports = router;
