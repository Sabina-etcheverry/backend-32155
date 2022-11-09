const { Router } = require('express')
const { CartController } = require('../controllers/cart');
const { ProductsController } = require('../controllers/products');
const { isAdmin } = require('../middlewares/checkAdmin')

const router = Router()

router.get('/:id/products', async (req, res, next) => {
    try {
        const id = parseInt(req.params.id)
        const response = await CartController.getCartById(id)
        const data = await response
        res.json({ 'Productos del carrito': data.products });

    } catch (err) {
        next(err);
    }
});

router.post('/', isAdmin, async (req, res, next) => {
    try {
        const dato = req.body
        let response = await CartController.saveCart(dato)

        res.json({ msg: `Nuevo carrito guardado ID: ${response}` });

    } catch (err) {
        next(err);
    }
});

router.post('/:id/products', isAdmin, async (req, res, next) => {
    try {
        const cartId = parseInt(req.params.id);
        const productId = parseInt(req.body.id);
        const cartSelected = await CartController.getCartById(cartId);
        const productToAdd = await ProductsController.getById(productId);
        await CartController.addProdInCart(cartSelected.id, productToAdd);
        return res.status(201).json({
            msg: "producto agregado al carrito con éxito",
        });

    } catch (err) {
        next(err);
    }
});

module.exports = router