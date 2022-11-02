const {Router} = require('express');
const productsRouter = require('./productos');

const mainRouter = Router();

mainRouter.use('/productos', productsRouter)

module.exports = mainRouter;