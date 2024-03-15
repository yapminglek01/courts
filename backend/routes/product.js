const router = require('express').Router();
const Product = require('../schema/product')

router.use((req, res, next) => {
    next();
})

router.get('/', async (req, res) => {
    res.status(200).send(`Hello product`)
})
  
router.post('/addProduct', async (req, res) => {
    const product = new Product(req.body);
    try {
        await product.save();
        return res.status(200).send({status: 200, message: "Product successfully added"})
    } catch (error) {
        return res.status(400).send({status: 400, message: error.message})
    }
    return res.status(401).send({status: 401, message: "An error has occured"})
})

module.exports = router;