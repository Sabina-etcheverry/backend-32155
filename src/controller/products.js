const createError = require('http-errors')
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

class ProductsAPI {

    constructor(products) {
        this.products = `./${products}.json`
    }

    async exists(id) {

        const indice = await this.products.findIndex(aProduct => aProduct.id == id)

        console.log(indice);
        return indice >= 0;
    }

    async read() {

        const data = await fs.promises.readFile(this.products, 'utf-8');
        return JSON.parse(data);
    }

    async saveProducts(products) {

        const data = JSON.stringify(products, null, '\t')
        await fs.promises.writeFile(this.products, data)
    }

    validateBody(data) {
        if (!data.title || !data.price || typeof data.title !== 'string' || typeof data.price !== 'number') throw createError(400, 'Datos invalidos');
    }

    async getAll() {

        const data = await this.read();
        return data;
    }

    async save(data) {

        this.validateBody(data);

        const productos = await this.read();


        if (productos.length) {

            id = productos[productos.length - 1].id + 1;
        }

        const nuevoProducto = {
            titulo: data.titulo,
            precio: data.precio,
            id: uuidv4(),
        }

        productos.push(nuevoProducto);

        await this.saveProducts(productos);
    }

    async getById(id) {

        const exist = this.exists(id);

        const productos = await this.read();

        const indice = productos.findIndex((data) => data.id === id);

        if (indice < 0) {
            throw createError(404, 'El producto no existe');
        }

        return productos[indice];
    }

    async findByIdAndUpdate(id, datanueva) {
		
        const exist = this.exists(id);

		if(!exist) throw createError(404, 'El producto no existe');

		this.validateBody(datanueva);

		const indice = await this.productos.findIndex(aProduct =>  aProduct.id == id)

		const oldProduct =  this.productos[indice];

		const nuevoProducto = {
			id: oldProduct.id,
			title: datanueva.title,
			price: datanueva.price,
		}

		this.productos.splice(indice, 1, nuevoProducto);

		return nuevoProducto;
	}

    async deleteById(id) {

        const exist = this.exists(id);
		if(!exist) return;

        const productos = await this.read();

        const indice = productos.findIndex((unProducto) => unProducto.id === id);

        productos.splice(indice, 1);

        await this.saveProducts(productos);
    }
}

const instanciaProductsApi = new ProductsAPI();

module.exports = {
	ProductsController : instanciaProductsApi
}

