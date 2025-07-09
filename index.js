const express = require('express');
const cors = require('cors');
const path = require('path');
const { sequelize, Venta } = require('./database');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// --- SERVIR LOS ARCHIVOS ESTÁTICOS DEL FRONTEND ---
// Apunta a la carpeta 'dist', que es la que crea Vite/React
const buildPath = path.resolve(__dirname, 'dist');
app.use(express.static(buildPath));

// --- SINCRONIZAR LA BASE DE DATOS ---
sequelize.sync({ force: false }).then(() => {
    console.log('Base de datos y tabla de Ventas sincronizadas!');
}).catch(err => {
    console.error('ERROR AL SINCRONIZAR LA BASE DE DATOS:', err);
});

// --- RUTAS DE LA API (esto no cambia) ---
app.get('/api/ventas', async (req, res) => {
    try {
        const ventas = await Venta.findAll({ order: [['fechaVenta', 'DESC']] });
        res.json(ventas);
    } catch (error) { res.status(500).json({ error: 'Error al obtener las ventas' }); }
});

app.post('/api/ventas', async (req, res) => {
    try {
        const nuevaVenta = await Venta.create(req.body);
        res.status(201).json(nuevaVenta);
    } catch (error) { res.status(500).json({ error: 'Error al registrar la venta' }); }
});

app.put('/api/ventas/:id', async (req, res) => {
    try {
        const venta = await Venta.findByPk(req.params.id);
        if (venta) {
            await venta.update(req.body);
            res.json(venta);
        } else { res.status(404).json({ error: 'Venta no encontrada' }); }
    } catch (error) { res.status(500).json({ error: 'Error al actualizar la venta' }); }
});

app.delete('/api/ventas/:id', async (req, res) => {
    try {
        const venta = await Venta.findByPk(req.params.id);
        if (venta) {
            await venta.destroy();
            res.status(204).send();
        } else { res.status(404).json({ error: 'Venta no encontrada' }); }
    } catch (error) { res.status(500).json({ error: 'Error al eliminar la venta' }); }
});

// --- RUTA ATRAPA-TODO (CORREGIDA para apuntar a 'dist') ---
// Cualquier otra petición que no sea a la API, devuelve la página principal.
app.get('/*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
    console.log('¡La aplicación está lista para usarse en esta dirección!');
});