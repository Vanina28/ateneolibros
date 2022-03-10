const express = require('express');
const app = express();
const path = require('path');
const methodOverride =  require('method-override'); //  métodos PUT y DELETE

//asignando la carpeta public como recurso estatico
const publicPath = path.resolve(__dirname, './public');
app.use(express.static(publicPath));

/* RUTAS */
const routesMain = require('./routers/mainRouters.js');
const routesProduct = require('./routers/productRouters.js');
const routesUsers = require('./routers/usersRouters.js');
const routesAdmin = require('./routers/adminRouters.js');


/* MIDDLEWARES */

app.use(methodOverride('_method')); // Pasar poder pisar el method="POST" en el formulario por PUT y DELETE
app.use(express.urlencoded({extended : false})); //recibir los valores de un formulario por POST

/*********Invocar template engine EJS*********/
app.set('view engine','ejs');

/**************** Middleware de aplicacion ******************/
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');

app.use(session({
    secret: "Shhh, It's a secret",
    resave: false,
    saveUninitialized: false,
}))//para generar sessiones en el sistema


//Utilizando Cookies
app.use(cookies());

//Utilizando session
app.use(userLoggedMiddleware);


// Asignando el servidor
app.listen(3030, () => {
    console.log("Servidor ejecutandose en el puerto 3030");
});

// Declarando la ruta del archivo inicio
app.use('/', routesMain);

// Declarando la ruta del archivo detalle del producto y carrito de compras
app.use('/products', routesProduct);

// Declarando la ruta del archivo registro1 
app.use('/users', routesUsers);

// Declarando la ruta del archivo login
app.use('/admin', routesAdmin);


