const express = require('express');
const router = express.Router();
const autenticar = require('../middlewares/auth');
const permitirRoles = require('../middlewares/roles');
const kitController = require('../controllers/kitController');

router.get('/', kitController.listarKits);
router.get('/admin', autenticar, permitirRoles('admin'), kitController.listarTodos);
router.post('/', autenticar, permitirRoles('admin'), kitController.crearKit);
router.put('/:id', autenticar, permitirRoles('admin'), kitController.actualizarKit);
router.patch('/:id/activo', autenticar, permitirRoles('admin'), kitController.cambiarActivo);

module.exports = router;