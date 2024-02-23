const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'e!MKCg556@5Z',
    database: 'pizzeria'
});

connection.connect((err) => {
    if (err) {
        console.error('Error de conexión a la base de datos: ', err);
    } else {
        console.log('Conexión exitosa a la base de datos');
    }
});
