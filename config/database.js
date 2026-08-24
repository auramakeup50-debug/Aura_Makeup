const Database = require('better-sqlite3');
const path = require('path');

// Ruta de la base de datos
const rutaDB = path.join(__dirname, '../database/aura_makeup.db');

// Crear/conectar la base de datos
const db = new Database(rutaDB);

console.log('SQLite conectado correctamente');

// Crear tabla de usuarios
db.exec(`
    CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        correo TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        rol TEXT NOT NULL DEFAULT 'usuario',
        fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP,

        CHECK (rol IN ('admin', 'usuario'))
    )
`);

console.log('Tabla usuarios lista');

module.exports = db;