const { Router } = require('express');
const ProductsRouter = require('./products');

const router = Router();

router.get('/', (req, res) => {
	res.json({
		msg: 'Bienvenidos'
	})
})

router.use('../products.json', ProductsRouter);

module.exports = router;