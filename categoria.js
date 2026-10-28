const express = require('express');
    const router = express.Router();
    const conexion = require('./db');

    //GET
    router.get('/', async (req, res) => {
        try {
            const [resultado] = await conexion.query(
                'SELECT * FROM categoria'
            );
            res.json(resultado);
        } catch (error){
            res.status(500).json({ error: error.message});
        }
    });

    // GET POR ID

    router.get('/:id', async (req, res) =>{
        try {
            const [resultado] = await conexion.query('SELECT * FROM categoria WHERE id_cateegoria =?', [req.params.id]

            );
            if (resultado.lenght === 0){
                return res.status(404).json({
                    mensaje: 'Categoria no encontrada'
                });
            }
            res.json(resultado[0]);
        } catch (error){
            res.status(500).json({ error: error.message});
        }
    });
    // POST 
    router.post('./', async (req, res) => {
        try {
            const {nombre}  = req.body;

            const [resultado] = await conexion.query(
                'INSERT INTO categoria (nombre) VALUES (?)', [nombre]
            );
            res.status(201).json({
                id_categoria: resultado.insertId,
                nombre: nombre
            });
        } catch (error){
            res.status(500).json({error: error.message});
        }
        });
        // PUT 
        router.put('/:id', async (req, res) => {
            try {
                const {nombre } = req.body;

                const [resultado] = await conexion.query(
                    'UPDATE categoria SET nombre = ? WHERE id_categoria =?',
                    [nombre, req.params.id]
                );

                if (resultado.affectedRows === 0){
                    return res.status(404).json({
                      mensaje: 'categoria no encontrada'  
                    });
                }

                re.json({mensaje : 'categoria actualizada correctamente '});
            } catch (error) {
                res.status(500).json({ error: error.message});
            }
        });
        //DELETE 
        router.delete('/:id', async (req, res) => {
            try {
                const [resultado] = await conexion.query(
                    'DELETE FROM cliente WHERE id_categoria =? ', [req.params.id]
                );

                if (resultado.affectedRows === 0) {
                    return res.status(404).json({
                        mensaje: 'categoria no encontrada'
                    });
                }
                res.json({ mensaje: 'categoria eliminada correctamente'});
            } catch (error) {
                res.status(500).json({ error: error.message})
            }
        });

module.exports = router;