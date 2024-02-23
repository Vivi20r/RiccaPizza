const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');  // Agregamos el módulo 'path'
const connection = require('./login/Conexion');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

// Configuramos las rutas estáticas
app.use('/login', express.static(path.join(__dirname, 'PizzeriaWebPage/login')));
app.use('/PaginaPrincipal', express.static(path.join(__dirname, 'PizzeriaWebPage/PaginaPrincipal')));

app.get('/login', (req, res) => {
    // Servir la página de inicio de sesión desde la carpeta 'login'
    res.sendFile(path.join(__dirname, 'PizzeriaWebPage/login/index.html'));
});

app.use('/login', (req, res) => {
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

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
