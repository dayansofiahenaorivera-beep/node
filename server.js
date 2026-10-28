
const express = require('express');
const cors = require('cors');

const app = express();
const puerto = 3030;

// Configuración del servidor
app.use(cors());
app.use(express.json());

// Importar los endpoints
const categoria = require('./categoria');
const cliente = require('./cliente');

// Registrar las rutas
app.use('/api/categoria', categoria);
app.use('/api/cliente', cliente);

// Ruta principal
app.get('/', (req, res) => {
    res.send('API funcionando correctamente');
});

// Iniciar servidor
app.listen(puerto, () => {
    console.log(`Servidor ejecutándose en http://localhost:${puerto}`);
});
