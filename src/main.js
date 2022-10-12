const express = require ('express');
const fs = require ('fs');
const path = require ('path');

const app = express ();
const PORT = 8080;

app.get('/', (req,res) => {
    return res.send('Bienvenidos, para ver todos los productos colocar "/productos" al link y para ver un producto cualquiera colocar "/productoRandom" al link')
});

app.get('/productos',(req,res) => {
    const allProducts = productos.getAll().then((unProducto)=> {
        return res.json(unProducto);
    })
});

app.get('/productoRandom', async (req,res) => {
    const random = (min,max) => {
        return Math.floor((Math.random()*(max - min + 1)) + min)
    }

    let prodRandom = await productos.getAll();
    prodRandom = prodRandom [random(0, prodRandom.length-1)];
    return res.json(prodRandom);
});

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${PORT}`);
});

server.on("error", error => console.log(`Error en servidor ${error}`));

class Contenedor  {
    
    constructor(archivo) {
    this.archivo = `./${archivo}.json` 
}

    async leerArchivo () {
        
            const data = await fs.promises.readFile(this.archivo, 'utf-8');
            return JSON.parse(data);
        }
        
        async guardarProductos (productos) {
            
            const data = JSON.stringify(productos, null, '\t')
            await fs.promises.writeFile(this.archivo, data)
        }

        async getAll () {
            
            const data = await this.leerArchivo();
            return data;
        }

        async save (data) {
            
            if(!data.titulo || !data.precio || typeof data.titulo !== 'string' || typeof data.precio !== 'number') throw new Error('Los datos son inválidos');
            
            let id = 1;
            const productos = await this.leerArchivo();


            if(productos.length){
                
                id = productos[productos.length -1].id +1;
             }
              
             const nuevoProducto = {
                  titulo: data.titulo,
                  precio: data.precio,
                  id: id
              }
              
              productos.push(nuevoProducto);
                
              await this.guardarProductos(productos);
        }

        async getById(idBuscado){
            
            const productos = await this.leerArchivo();
            
            const indice  = productos.findIndex((data) => data.id === idBuscado);

            if (indice < 0 ) {
                throw new Error ('El producto no existe');
            }
            
            return productos[indice];
        }
    
        async deleteById(idBuscado){
            const productos = await this.leerArchivo();
         
            const indice = productos.findIndex((unProducto)=> unProducto.id === idBuscado);

            if (indice < 0 ) {
                return;
            }

            productos.splice(indice, 1);

            await this.guardarProductos(productos);
        }
    
        async deleteAll(){
             
            await this.guardarProductos([]);
           
        }
}
    
const productos = new Contenedor ('productos'); 
    