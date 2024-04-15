const express = require('express');
const router = express.Router();
const Review = require('../schema/review');


router.use((req, res, next) => {
    next();
})

router.get('/', (req, res) => {
    res.send('Order api working')
})

router.post('/add-review', async (req, res) => {
    try {
      const { rating, comment, orderId, productId } = req.body;
  
      // Handle the review submission logic here
      // Example: Save the review to the database
  
      return res.status(200).json({ message: 'Review added successfully.' });
    } catch (error) {
      console.error('Error adding review:', error);
      return res.status(500).json({ message: 'Internal server error.' });
    }
  });
module.exports = router;
