const asyncHandler = require('express-async-handler')
const { Router } = require('express');
const { ProductsController } = require('../controller/products');

const router = Router();

router.get('/', async (req, res) => {
	res.json({
		msg: await ProductsController.getAll()
	})
})

//funcion async para el get
const funcionAsyncGet = async (req,res) => {
    const id = parseInt(req.params.id);

    const product = await ProductsController.getById(id)
    res.json({
        msg: product
    })
}

//funcion async para el put 
const funcionAsyncPut = async (req, res) => {
	
    const id = parseInt(req.params.id);
	const { body }  = req

	const data = await ProductsController.findByIdAndUpdate(id, body);
	res.json({
		msg: data
	})
}

//funcion async para el post 
const funcionAsyncPost = async (req,res) => {
    const { body }  = req
        const data = await ProductsController.save(body);
        res.json({
            msg: `Nuevo producto agregado ${data}`
        })
}

//funcion async para el delete
const funcionAsyncDelete = async (req,res) => {
    const id = parseInt(req.params.id);
    await ProductsController.deleteById(id);

	res.json({
		msg: 'Producto eliminado'
	})
}

router.get('/:id', asyncHandler(funcionAsyncGet));

router.post('/', asyncHandler(funcionAsyncPost));

router.put('/:id', asyncHandler(funcionAsyncPut));

router.delete('/:id', asyncHandler(funcionAsyncDelete));

module.exports = router;