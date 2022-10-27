const express = require('express');
const path = require('path');
const fs = require('fs/promises');

const uploadProducts = express();
uploadProducts.use(express.static('public'));

const viewsFolderPath = path.resolve(__dirname, '../../views');
const filePath =  path.resolve(__dirname, '../../products.json');
uploadProducts.set('view engine', 'ejs');
uploadProducts.set('views', viewsFolderPath);

const getData = async () => {
	return await fs.readFile(filePath, 'utf-8');
}

const writeData = async (data) =>{
	return await fs.writeFile(filePath, JSON.stringify(data, null, '\t'));
}


uploadProducts.get('/', async (req, res) => {
    const data = 'Bienvenidos al Ecommerce Etcheverry'
    
    res.render('uploadProducts', {data: data})
    
});
    
uploadProducts.post('/', async (req, res) => {
	
    const { title, price } = req.body;

	if(!title || !price) {
		return res.status(400).json({
			error: "Falta un dato"
		})
	}

	const products = JSON.parse(await getData())

	const newProduct = {
		title,
		price,
		id: products.length + 10
	}
	
    products.push(newProduct);

	writeData(products)
    
    res.redirect('/api')
    
});

module.exports = uploadProducts;