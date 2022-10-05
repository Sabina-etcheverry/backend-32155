const fs = require('fs');
const path = require ('path');

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
    
        // async deleteAll(){
             
        //     await this.guardarProductos([]);
           
        // }
}

const main = async () => {
    
    const productos = new Contenedor ('productos'); 
    
    console.log("1: Llamamos a todos los productos");
    const getAll = await productos.getAll();
    console.log(getAll);
    console.log("--------------------------------------");
    
    console.log("2: Guardamos un producto");
    const save = await productos.save({
        titulo: 'Jean con Rotura',
        precio: 2200
    });
    console.log("--------------------------------------");

    console.log("3: Buscamos producto por id");
    const buscarId = await productos.getById(2);
    console.log("--------------------------------------");


    console.log("4: Borramos producto por su id");
    const borrarId = await productos.deleteById(2);
    console.log("--------------------------------------");
    // console.log("5: Borramos todos los productos");
    // const borrarTodo = await productos.deleteAll();
    // console.log("--------------------------------------");
  
}

main();

