const router = require('express').Router();
const Product = require('../schema/product')
const { memoryUpload } = require('../middleware/multer')

router.use((req, res, next) => {
    next();
})

router.get('/', async (req, res) => {
    res.status(200).send(`Hello product`)
})

router.get('/getProducts',  async (req, res) => {
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
    // return res.status(401).send({status: 401, message: "An error has occured"})
})

module.exports = router;