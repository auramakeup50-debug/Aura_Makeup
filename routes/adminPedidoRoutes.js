const express = require('express');
const router = express.Router();

const autenticar = require('../middlewares/auth');
const permitirRoles = require('../middlewares/roles');
const adminPedidoController = require('../controllers/adminPedidoController');

router.use(autenticar, permitirRoles('admin'));
router.get('/', adminPedidoController.listarPedidos);
router.get('/:id', adminPedidoController.obtenerPedido);
router.patch('/:id/estado', adminPedidoController.actualizarEstado);

module.exports = router;
