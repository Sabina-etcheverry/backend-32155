const express = require('express');
const path = require('path');
const fs = require('fs/promises');

const products = express();
products.use(express.static('public'));

const viewsFolderPath = path.resolve(__dirname, '../../views');
const filePath =  path.resolve(__dirname, '../../products.json');

products.set('view engine', 'ejs');
products.set('views', viewsFolderPath);

const getData = async () => {
	return await fs.readFile(filePath, 'utf-8');
}

products.get('/', async (req, res) => {
    const data =  JSON.parse(await getData());

  res.render('products', {data:data});
});

module.exports = products;