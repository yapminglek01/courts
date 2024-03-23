const router = require('express').Router();
const Product = require('../schema/product')
const { memoryUpload } = require('../middleware/multer')

router.use((req, res, next) => {
    next();
})

router.get('/', async (req, res) => {
    res.status(200).send(`Hello product`)
})

router.get('/products',  async (req, res) => {
    try {
        const product = await Product.find()
        return res.status(200).send({status: 200, message: "Product retrieved", data: JSON.parse(JSON.stringify(product))})
    } catch (error) {
        return res.status(400).send({status: 400, message: error.message})
    }
})
  
router.post('/addProduct', memoryUpload.single('image'), async (req, res) => {
    const product = new Product(req.body);
    product.imageData = req.file

    if(req.file.size > 5000000) throw new Error("File size cannot exceed 5mb")
    try {
        await product.save();
        return res.status(200).send({status: 200, message: "Product successfully added"})
    } catch (error) {
        return res.status(400).send({status: 400, message: error.message})
    }
})


router.get('/product/:id', async (req, res) => {
    try {
        const product = await Product.findOne({_id: req.params.id})
        if(product === null) throw new Error('Product does not exist')
        delete product.quantity
        return res.status(200).send({status: 200, message: 'Successfully retrieved product', data: product})
    } catch(error) {
        return res.status(400).send({status: 400, message: error.message})
    }
})


module.exports = router;