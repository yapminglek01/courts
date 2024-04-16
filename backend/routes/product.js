const router = require('express').Router();
const Product = require('../schema/product')
const Review = require('../schema/review')

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

router.delete('/deleteProduct/:productId', async (req, res) => {
    const { productId } = req.params;
    try {
        await Product.findByIdAndDelete(productId);
        return res.status(200).send({ status: 200, message: "Product deleted successfully" });
    } catch (error) {
        return res.status(400).send({ status: 400, message: error.message });
    }
});

router.post('/getProduct', async (req, res) => {
    const { productId } = req.body;
    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).send({ status: 404, message: "Product not found" });
        }
        return res.status(200).send({ status: 200, message: "Product retrieved successfully", data: product });
    } catch (error) {
        return res.status(400).send({ status: 400, message: error.message });
    }
});

router.put('/updateProduct/:productId', async (req, res) => {
    const { productId } = req.params;
    const updatedData = req.body;
  
    try {
      const product = await Product.findByIdAndUpdate(productId, updatedData, { new: true });
  
      if (!product) {
        return res.status(404).send({ status: 404, message: "Product not found" });
      }
  
      return res.status(200).send({ status: 200, message: "Product updated successfully", updatedData });
    } catch (error) {
      return res.status(400).send({ status: 400, message: error.message });
    }
  });

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

router.get('/productreview/:id', async (req, res) => {
    const productId = req.params.id;
  
    try {
      // Find all reviews with matching productId
      const reviews = await Review.find({ productId });
  
      if (!reviews || reviews.length === 0) {
        return res.status(404).json({ message: 'No reviews found for the specified product.' });
      }
  
      // Initialize an empty array to store matching reviews
      const matchingReviews = [];
  
      // Iterate through the reviews and filter by productId
      reviews.forEach(review => {
        if (review.productId === productId) {
          // If productId matches, save the review info to an attribute
          matchingReviews.push({
            rating: review.rating,
            comment: review.comment,
            
          });
        }
      });
  
      // Return the filtered reviews
      console.error('Success:', matchingReviews);

      return res.status(200).json(matchingReviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      return res.status(500).json({ message: 'Internal server error.' });
    }
  });
module.exports = router;