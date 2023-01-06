var express = require('express');
var app = express();
const port = 3000;

const productos = [
    {id: 1, nombre: "Sexy Fish", tipo: "Malbec", precio: 2100},
    {id: 2, nombre: "Pedriel", tipo: "Rosado de Malbec", precio: 3600},
    {id: 3,nombre: "Antigal Uno", tipo: "Sauvignon Blanc",precio: 3000},
    {id: 4, nombre: "Jonnie Walker", tipo: "Double Black Whisky", precio: 11300},    
    {id: 5, nombre: "Chivas Regal 12", tipo: "Blended Scotch Whisky", precio: 11000}
];

app.get('/', (req, res) => {
    res.send('<h1>hello world</h1>');
});

app.listen(port, () => {
    console.log(`Tarea de rutas en Express - Entrar: http://localhost:${port}`);
});


// Crear  una ruta que reciba nombre y apellido por medio de params (ruta parametrizada) y devuelva por un res.send un query string armando un saludo (ej: res.send(`Hola ${nombre}`) ) 
// y que se muestre en la página con formato de párrafo.

app.get('/saludar/:nombre', function (req, res) {
    nombre = req.params.nombre
    res.send(`Hola ${nombre}`)
});


// Crear una ruta “dividir” la cual reciba dos parámetros (ruta parametrizada) divisor y dividendo, la misma tiene que devolver un res.json({error: "no se puede dividir por cero"}) 
// si el usuario ingresa un 0, si no es el caso devolver res.json({resultado}).

app.get("/dividir/:divisor/:dividendo", (req, res) => {
    const divisor = Number(req.params.divisor);
    const dividendo = Number(req.params.dividendo);

    const resultado = dividendo / divisor

    if (divisor === 0) {
        res.json({error: "no se puede dividir por cero"}) 
    } else {
        res.json(`El resultado de la division es: ${resultado}`)
    }
});


// Crear una ruta “lista de compras” que devuelva un array con 5 objetos, cada uno con su correspondiente código o id único (pueden ser productos, servicios, clientes, etc). 
// Se debe utilizar res.json. con el status de respuesta correspondiente.

app.get("/lista-de-compras", (req, res) => {
    res.json(productos);
});

// Crear una ruta, añadiendo la programación para recibir una query como agregado a la ruta anterior que permita buscar un objeto en el array por su nombre y devuelva en json el objeto encontrado, 
// y en caso de no encontrarlo devuelva un null, cada respuesta con su correspondiente código de status.

app.get("/productos/:id", (req, res) => {
    const id = Number(req.params.id);
    const producto = productos.find((producto) => producto.id === id)

    if (producto) {
        res.status(200).json({
            producto: producto,
            statusCode: 200,
            errorMessage: null,
        })
    } else {
        res.status(404).json({
            producto: null,
            statusCode: 404,
            errorMessage: "Producto no encotrado",
        })
    }
});

// Por último, la última ruta tomará un parámetro en el que se esperará un número, el cual será la cantidad de números que se deberán retornar de la serie de Fibonacci (1,1,2,3,5,8,13,21,34,55,89,144,233,377,610,987,1597, más info por acá). 
// Si la solicitud del cliente es incorrecta, devolver por defecto los 20 primeros números de la serie.
