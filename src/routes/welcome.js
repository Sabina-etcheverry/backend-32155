const express = require('express');
const path = require('path');
const fs = require('fs/promises');

const welcome = express();
welcome.use(express.static('public'));

const viewsFolderPath = path.resolve(__dirname, '../../views');
const filePath =  path.resolve(__dirname, '../../products.json');
welcome.set('view engine', 'ejs');
welcome.set('views', viewsFolderPath);


welcome.get('/', async (req, res) => {
const data = [
    {
        name:"Lista de productos",
        link: "http://localhost:8080/api/products/"
    },
    {
        name:"Carga de productos",
        link: "http://localhost:8080/api/uploadProducts/"
    }
]

    res.render('hello',{data: data})

});








module.exports = welcome;