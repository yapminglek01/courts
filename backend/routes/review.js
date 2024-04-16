const router = require('express').Router();
const Review = require('../schema/review');

// router.use(express.json());
router.use((req, res, next) => {
  next();
})

router.get('/', async (req, res) => {
  res.status(200).send(` product`)
})

router.get('/add', async (req, res) => {
  res.status(200).send('GET request received');
});

// Handle POST request at '/addcomment' endpoint
router.post('/addcomment', async (req, res) => {
   try {
    const { rating, comment, orderId, productId } = req.body;

    const newReview = new Review({
      rating,
      comment,
      orderId,
      productId
    });

    await newReview.save();

    return res.status(200).json({ message: 'Review added successfully.' });
  } catch (error) {
    console.error('Error adding review:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
});

 


module.exports = router;
