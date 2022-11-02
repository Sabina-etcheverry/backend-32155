const createError = require('http-errors')
const fs = require('fs');
const path = require('path');

class ProductsAPI {

    async read() {
        const viewsFolderPath = path.resolve(__dirname, '../../productos.json')
        const data = await fs.promises.readFile(viewsFolderPath,'utf-8');
        return JSON.parse(data);
    }

    async saveProducts(products) {

        fs.promises.writeFile('./productos.json',JSON.stringify(products, null, '\t'), 'utf-8');
    }

    async exists(id) {
        const data = await this.read()
        const indice = data.findIndex(aProduct => aProduct.id == id)

        return indice >= 0;
    }


    validateBody(data) {
        if (!data.title || !data.price || typeof data.title !== 'string' || typeof data.price !== 'number') throw createError(400, 'Datos invalidos');
    }

    async getAll() {

        const data = await this.read();
        return data;
    }

    async save(data) {

        // this.validateBody(data);

        const productos = await this.read();

        let id;

        if (productos.length) {

            id = productos[productos.length - 1].id + 1;
        }

        const nuevoProducto = {
            title: data.title,
            price: data.price,
            id: id
        }

        productos.push(nuevoProducto);

        return await this.saveProducts(productos);
    }

    async getById(id) {

        const exist = this.exists(id);

        const productos = await this.read();

        const indice = productos.find((data) => data.id === id);

        if (!indice) {
            throw createError(404, 'El producto no existe');
        }

        return indice;
    }

    async findByIdAndUpdate(id, datanueva) {
		
        const exist = this.exists(id);

		if(!exist) throw createError(404, 'El producto no existe');
        
        const productos = await this.getAll();

		this.validateBody(datanueva);

		const indice = productos.findIndex(aProduct =>  aProduct.id == id)

		// const oldProduct =  productos[indice];

		const nuevoProducto = {
			id: id,
			title: datanueva.title,
			price: datanueva.price,
		}

		productos.splice(indice, 1, nuevoProducto);

		await this.saveProducts(productos);
        return nuevoProducto;
	}

    async deleteById(id) {

        const exist = this.exists(id);
		
        if(!exist) return;

        const productos = await this.read();

        productos.splice(0);

        return await this.saveProducts(productos);
    }
}

const instanciaProductsApi = new ProductsAPI();

module.exports = {
	ProductsController : instanciaProductsApi
}