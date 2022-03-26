const express = require('express');
const session = require('express-session');
const cookies = require('cookie-parser');

const app = express();
const path = require('path');
const methodOverride =  require('method-override'); // Para poder usar los métodos PUT y DELETE

//asignando la carpeta public como recurso estatico
const publicPath = path.resolve(__dirname, './public');
app.use(express.static(publicPath));

const routesMain = require('./routers/mainRouters.js');
const routesUsers = require('./routers/usersRouters.js');
const routesAdmin = require('./routers/adminRouters.js');


app.use(methodOverride('_method')); // Pasar poder pisar el method="POST" en el formulario por PUT y DELETE
app.use(express.urlencoded({extended : false})); //recibir los valores de un formulario por POST

app.set('view engine','ejs');

const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');

app.use(session({
  secret: "Shhh, It's a secret",
  resave: false,
  saveUninitialized: false,
}))


app.use(cookies());

app.use(userLoggedMiddleware);


app.listen(2828, () => {
    console.log("Servidor ejecutandose en el puerto 2828");
});

app.use('/', routesMain);

app.use('/users', routesUsers);
app.use('/admin', routesAdmin);