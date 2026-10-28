
const express = require('express');
const router = express.Router();
const conexion = require('./db');

// GET: consultar todos los clientes
router.get('/', async (req, res) => {
    try {
        const [resultado] = await conexion.query(
            'SELECT * FROM cliente'
        );

        res.json(resultado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET por ID: consultar un cliente
router.get('/:id', async (req, res) => {
    try {
        const [resultado] = await conexion.query(
            'SELECT * FROM cliente WHERE id_cliente = ?',
            [req.params.id]
        );

        if (resultado.length === 0) {
            return res.status(404).json({
                mensaje: 'Cliente no encontrado'
            });
        }

        res.json(resultado[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST: crear un cliente
router.post('/', async (req, res) => {
    try {
        const { nombre, correo, telefono } = req.body;

        const [resultado] = await conexion.query(
            'INSERT INTO cliente (nombre, correo, telefono) VALUES (?, ?, ?)',
            [nombre, correo, telefono]
        );

        res.status(201).json({
            id_cliente: resultado.insertId,
            nombre,
            correo,
            telefono
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT: actualizar un cliente
router.put('/:id', async (req, res) => {
    try {
        const { nombre, correo, telefono } = req.body;

        const [resultado] = await conexion.query(
            'UPDATE cliente SET nombre = ?, correo = ?, telefono = ? WHERE id_cliente = ?',
            [nombre, correo, telefono, req.params.id]
        );

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                mensaje: 'Cliente no encontrado'
            });
        }

        res.json({ mensaje: 'Cliente actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE: eliminar un cliente
router.delete('/:id', async (req, res) => {
    try {
        const [resultado] = await conexion.query(
            'DELETE FROM cliente WHERE id_cliente = ?',
            [req.params.id]
        );

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                mensaje: 'Cliente no encontrado'
            });
        }

        res.json({ mensaje: 'Cliente eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
