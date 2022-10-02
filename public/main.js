//MAIN:JS CONTIENE LA LOGICA DEL CLIENTE

//Instanciar la conexion del cliente hacia el servidor socket
const socket = io();        //Socket server connection

const chat = document.getElementById("chat");


/*A continuacion, el metodo socket.on estará escuchando en el lado del cliente por cualquier evento llamado 'messages' y
recibirá como argumento de su callback, un parametro data, que es el argumento que estamos pasando en el lado del servidor (como el arreglo de mensajes por ejemplo)
*/
socket.on('messages',(data) => {                            
    console.log(data);
    chat.innerHTML = "<h3>Enrique</h3>";
})