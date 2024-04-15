const router = require('express').Router();

// Import all the routes here
router.use('/auth', require('./auth'))
router.use('/product', require('./product'))
router.use('/order', require('./order'))
router.use('/review', require('./review'))


router.get('/', (req, res) => {
    res.status(200).send({status: 200, message: "API service is working"})
})


module.exports = router;