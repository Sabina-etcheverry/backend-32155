const { Router } = require('express');
const ProductsRouter = require('../products.json');

const router = Router();

router.get('/', (req, res) => {
	res.json({
		msg: 'Bienvenidos'
	})
})

router.use('/products', ProductsRouter);

module.exports = router;