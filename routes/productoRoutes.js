const express = require('express');
const router = express.Router();

const autenticar = require('../middlewares/auth');
const permitirRoles = require('../middlewares/roles');
const productoController = require('../controllers/productoController');

router.get('/', productoController.listarProductos);
router.post('/', autenticar, permitirRoles('admin'), productoController.crearProducto);
router.put('/orden', autenticar, permitirRoles('admin'), productoController.reordenarProductos);
router.put('/:id', autenticar, permitirRoles('admin'), productoController.actualizarProducto);
router.delete('/:id', autenticar, permitirRoles('admin'), productoController.eliminarProducto);

module.exports = router;
