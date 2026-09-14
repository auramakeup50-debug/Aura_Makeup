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

db.exec(`
    CREATE TABLE IF NOT EXISTS productos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        tipo TEXT NOT NULL,
        categoria TEXT NOT NULL CHECK (categoria IN ('cosmeticos', 'capilares')),
        emoji TEXT NOT NULL DEFAULT '✨',
        precio INTEGER NOT NULL,
        descripcion TEXT NOT NULL,
        imagen TEXT NOT NULL,
        opciones TEXT,
        posicion INTEGER NOT NULL DEFAULT 0
    )
`);

const totalProductos = db.prepare('SELECT COUNT(*) AS total FROM productos').get().total;
if (totalProductos === 0) {
    const insertarProducto = db.prepare(`
        INSERT INTO productos (nombre, tipo, categoria, emoji, precio, descripcion, imagen, opciones, posicion)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const productosIniciales = [
        ['LUMÉA', 'Corrector', 'cosmeticos', '✨', 34900, 'Cobertura modulable que ilumina la mirada y unifica el tono con un acabado natural y ligero.', '/images/productos/lumea.png', JSON.stringify({ etiqueta: 'Selecciona un tono', valores: ['Marfil', 'Beige claro', 'Beige medio', 'Arena', 'Caramelo'] })],
        ['VELUNA', 'Base', 'cosmeticos', '🤍', 49900, 'Base ligera y confortable que deja la piel uniforme, fresca y luminosa durante todo el día.', '/images/productos/veluna.png', JSON.stringify({ etiqueta: 'Selecciona un tono', valores: ['Porcelana', 'Marfil', 'Beige claro', 'Beige medio', 'Caramelo'] })],
        ['ÉLARA', 'Pestañina', 'cosmeticos', '🖤', 29900, 'Máscara que define, alarga y aporta volumen para una mirada intensa y elegante.', '/images/productos/elara.png', null],
        ['NUVÉ', 'Polvo Suelto', 'cosmeticos', '☁️', 34900, 'Polvo ultrafino que sella el maquillaje, controla el brillo y deja un acabado suave y natural.', '/images/productos/nuve.png', JSON.stringify({ etiqueta: 'Selecciona un tono', valores: ['Translúcido', 'Banana', 'Almendra'] })],
        ['SELENE', 'Gel de Cejas', 'cosmeticos', '🌙', 24900, 'Gel fijador que peina, define y mantiene las cejas en su lugar con un acabado natural.', '/images/productos/selene.png', null],
        ['SOLÉA', 'Iluminador', 'cosmeticos', '✨', 29900, 'Iluminador de brillo sedoso que aporta un efecto radiante y delicado a la piel.', '/images/productos/solea.png', JSON.stringify({ etiqueta: 'Selecciona un tono', valores: ['Champagne', 'Dorado suave', 'Bronce rosado'] })],
        ['ROSÉLIA', 'Rubor', 'cosmeticos', '🌸', 29900, 'Rubor de textura suave que aporta un toque de color fresco y natural al rostro.', '/images/productos/roselia.png', JSON.stringify({ etiqueta: 'Selecciona un tono', valores: ['Rosa pétalo', 'Coral fresco', 'Terracota'] })],
        ['SCULPTÉ', 'Contorno', 'cosmeticos', '🤎', 29900, 'Contorno cremoso que define y da dimensión al rostro de forma fácil, difuminada y natural.', '/images/productos/sculpte.png', JSON.stringify({ etiqueta: 'Selecciona un tono', valores: ['Light', 'Deep'] })],
        ['AMOURA', 'Labial', 'cosmeticos', '💋', 24900, 'Labial cremoso de color intenso que deja los labios suaves, definidos y protagonistas.', '/images/productos/amoura.png', JSON.stringify({ etiqueta: 'Selecciona un tono', valores: ['Nude Aura', 'Rosa Amour', 'Rojo Éclat', 'Terracota', 'Berry'] })],
        ['ÉCLAT', 'Gloss', 'cosmeticos', '💎', 22900, 'Gloss de efecto cristal que aporta brillo intenso y una apariencia jugosa a los labios.', '/images/productos/eclat.png', JSON.stringify({ etiqueta: 'Selecciona un tono', valores: ['Crystal', 'Pink Glow', 'Nude Shine', 'Rose Gold', 'Berry Glass'] })],
        ['ASTRA', 'Paleta de Sombras', 'cosmeticos', '🌌', 54900, 'Paleta inspirada en los tonos del universo, perfecta para crear looks naturales, sofisticados o glam.', '/images/productos/astra.png', null],
        ['ESSENZA', 'Kit de Brochas', 'cosmeticos', '🖌️', 59900, 'Colección de brochas suaves y precisas diseñada para aplicar, difuminar y perfeccionar cada look.', '/images/productos/essenza.png', null],
        ['Velvet Hair', 'Perfume Capilar', 'capilares', '🤎', 39900, 'Un perfume capilar delicado con un aroma floral y dulce que deja tu cabello con una fragancia agradable durante todo el día. Su esencia aporta una sensación fresca y femenina, perfecta para complementar tu rutina de cuidado.', '/images/productos/velvet-hair.png', JSON.stringify({ etiqueta: 'Selecciona un aroma', valores: ['Vainilla floral', 'Rosa dulce', 'Jazmín fresco', 'Frutos rojos'] })],
        ['Soft Brush', 'Cepillo para Cabello', 'capilares', '🤎', 19900, 'Un cepillo diseñado para desenredar el cabello suavemente y facilitar el peinado. Sus cerdas flexibles ayudan a reducir los tirones y el frizz, dejando el cabello más suave, ordenado y brillante.', '/images/productos/soft-brush.png', null],
        ['Glow Tips', 'Aceite para Puntas', 'capilares', '🤎', 29900, 'Un aceite ligero creado para cuidar las puntas del cabello. Ayuda a aportar suavidad, brillo y una apariencia más saludable, dejando las puntas con un acabado bonito y sin sensación pesada.', '/images/productos/glow-tips.png', null],
        ['Silky Night', 'Gorro de Satin', 'capilares', '🤎', 24900, 'Un gorro de satín pensado para proteger tu cabello mientras duermes. Ayuda a disminuir el frizz y a conservar el peinado, manteniendo el cabello suave, ordenado y con más brillo al despertar.', '/images/productos/silky-night.png', JSON.stringify({ etiqueta: 'Selecciona un color', valores: ['Champagne', 'Rosa polvo', 'Café cacao', 'Negro'] })]
    ];
    const insertar = db.transaction(() => productosIniciales.forEach((producto, posicion) => insertarProducto.run(...producto, posicion)));
    insertar();
    console.log('Catálogo inicial de productos listo');
}

module.exports = db;