const socketIo = require('socket.io');
const { ProductsController } = require('../controller/productos');
const path = require("path");
const { formatMessages } = require("../utils/messages");
const messageObj = require("../controller/messages");

const MessagesFileFolderPath = path.resolve(__dirname, "../../messages.json");

messageObj.fileName = MessagesFileFolderPath;

let io;

const initWsServer = (server) => {
    io = socketIo(server);
    
    io.on('connection', async (socket) => {
        console.log('Nueva Conexion establecida!');
        
        
        data = await ProductsController.getAll();
        socket.emit('Server:TodosLosProductos', data) 
        
        socket.on('Cliente:nuevoProducto', async (data) =>{
            await ProductsController.save(data);
            console.log('Se agrego un producto nuevo al servidor de nombre ',data.title);
        });
                
        socket.on("sendMesssage", async (message) => {
            io.emit("lastMessage", formatMessages(message));
      
            try {
              let exist = await messageObj.validateExistFile();
              if (exist) {
                console.log("El archivo ya existe!");
              }
              await messageObj.saveMessage(formatMessages(message));
            } catch (error) {
              console.log(error);
            }
    });
});
    return io;

};

const getWsServer = () => {
    return io;
}


module.exports = {
    initWsServer,
    getWsServer
};