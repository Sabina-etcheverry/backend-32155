const Server = require('../src/services/server')

const puerto = 8080;
Server.listen(puerto, () => {
	console.log(`Servidor Escuchando en el puerto ${puerto}`);
})