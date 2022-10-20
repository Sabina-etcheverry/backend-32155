const express = require ('express');
const { Router } = require('express');
const ProductsRouter = require('./products');
const formRouter = require ('./form');

const router = Router();

router.get('/', (req, res) => {
	res.json({
		msg: 'Bienvenidos'
	})
})

router.use('/products', ProductsRouter);
router.use('/form', formRouter);

module.exports = router;