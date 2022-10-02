//Desafio 6, Aplicación chat con websocket
//INDEX:JS CONTIENE LA LOGICA DEL SEVIDOR

const express = require('express');                 //Importamos el modulo express
const {Server: HttpServer} = require('http');       //Importamos la clase Server del modulo nativo de nodejs "http" pero le cambiaremos el nombre 
                                                    //por HttpServer para evitar confusiones al trabajar
const {Server: SocketServer} = require('socket.io'); //Importamos el modulo socket.io y le cambiamos el nommbre 
const path = require('path');
const {engine} = require('express-handlebars');
const apiRoutes = require('./routers/routers');

//A continuacion la configuración básica de un servidor http con socket en conjunto
const PORT = process.env.PORT || 8080;              //Configuramos el puerto por la variable de entorno O por el 8080
const app = express();                              //Instanciamos el modulo express
const httpServer = new HttpServer(app);             //instanciamos el servidor http, pasando por parametro la instancia de express
const io = new SocketServer(httpServer);            //intanciamos el servidor socket pasando como parametro la intancia http

//Configuración del motor de plantilla para el uso de HANDLEBARS
app.engine('hbs', engine({
    extname: 'hbs',
    defaultLayout: 'main.hbs',
    layoutsDir: path.resolve(__dirname, './views/layouts'),
    partialsDir: path.resolve(__dirname, './views/partials')
}));

app.set('views','./views');                 //Indicamos a express la ruta de nuestra plantilla
app.set('view engine', 'hbs');              //Indicamos a express el motor de plantillas a usar

const messages = [
    {author: "Marco", text: "Hadouken"},
    {author: "Enrique", text: "Me lleva la..."},
    {author: "JS", text: "Café americano"},
];


//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("./public"));                //Archivos estaticos

//Routes
app.use('/api', apiRoutes);                 //Ruta a routers.js con prefijo /api

//Listen
httpServer.listen(PORT, ()=> {
    console.log("Server is up and running on port ", PORT);
})

//Eventos socket

// El metodo on, escuchara por el evento 'connection'
io.on('connection', (socket)=> {
    console.log("New client connection! (nuevo cliente conectado)");          //Muestra mensaje en la consola cuando se conecta un nuevo cliente
    console.log(socket.id);                         //Muestra por consola el id del nuevo cliente conectado.
    console.log(messages);

    socket.emit('messages', messages);                                   //AQUI TIENE QUE IR LA LOGICA PARA MANDAR LA TABLA DE PRODUCTOS??
})