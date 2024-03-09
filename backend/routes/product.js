const router = require('express').Router();

router.use((req, res, next) => {
    next();
})

router.get('/', async (req, res) => {
    res.status(200).send(`Hello product`)
})
  


module.exports = router;