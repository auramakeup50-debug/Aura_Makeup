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


// Página inicial del usuario
app.get('/usuario/inicio.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'usuario', 'inicio.html'));
});


// Panel inicial del administrador
app.get('/admin/dashboard.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'admin', 'dashboard.html'));
});


// Rutas de autenticación
app.use('/api/auth', require('./routes/authRoutes'));


// Iniciar servidor
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Aura Makeup funcionando en http://localhost:${PORT}`);
});