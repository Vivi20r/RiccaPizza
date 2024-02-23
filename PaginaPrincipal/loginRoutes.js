const express = require('express');
const router = express.Router();
const connection = require('./Conexion');

// Ruta para servir la página de inicio de sesión
router.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Ruta para manejar el inicio de sesión
router.post('/', (req, res) => {
    const { usuario, contraseña } = req.body;
    const query = `SELECT * FROM usuario WHERE usuario = '${usuario}' AND contraseña = '${contraseña}'`;

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error al realizar el login: ', err);
            res.status(500).send('Error al procesar el inicio de sesión');
        } else {
            console.log('Resultados del login: ', results);

            // Verificar credenciales y redirigir a la página principal si es exitoso
            if (results.length > 0) {
                res.redirect("/PaginaPrincipal/index.html");
            } else {
                res.status(401).send('Credenciales incorrectas');
            }
        }
    });
});

module.exports = router;
