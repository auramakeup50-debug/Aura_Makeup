const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();


// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Archivos públicos
app.use(express.static(path.join(__dirname, 'public')));


// Página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});


// Página de registro
app.get('/registro', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'registro.html'));
});


// Página de login
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});


// Catálogo público de productos
app.get('/productos', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'productos.html'));
});

app.get('/catalogo-publico', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'catalogo-publico.html'));
});


// Panel inicial del administrador
app.get('/admin/dashboard.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'admin', 'dashboard.html'));
});

app.get('/admin/productos.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'admin', 'productos.html'));
});

app.get('/admin/kits.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'admin', 'kits.html'));
});

app.get('/admin/usuarios.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'admin', 'usuarios.html'));
});

app.get('/admin/pedidos.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'admin', 'pedidos.html'));
});


// Páginas del usuario
app.get('/usuario/inicio.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'usuario', 'inicio.html'));
});

app.get('/usuario/perfil.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'usuario', 'perfil.html'));
});

app.get('/usuario/historial.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'usuario', 'historial.html'));
});

app.get('/usuario/carrito.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'usuario', 'carrito.html'));
});


// Rutas de autenticación
app.use('/api/auth', require('./routes/authRoutes'));

app.use('/api/usuario', require('./routes/usuarioRoutes'));
app.use('/api/productos', require('./routes/productoRoutes'));
app.use('/api/kits', require('./routes/kitRoutes'));
app.use('/api/admin/usuarios', require('./routes/adminUsuarioRoutes'));
app.use('/api/admin/pedidos', require('./routes/adminPedidoRoutes'));
app.use('/api/pedidos', require('./routes/pedidoRoutes'));


// Iniciar servidor
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Aura Makeup funcionando en http://localhost:${PORT}`);
});