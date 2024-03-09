const router = require('express').Router();
const User = require('../schema/user')
const Product = require('../schema/products')



router.use((req, res, next) => {
    next();
})

router.get('/test', (req, res) => {
    res.send('hellos')
})

router.post('/register', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        return res.status(200).send({status: 200, message: "Account registered successfully"})
    } catch (error) {
        return res.status(400).send({status: 400, message: error.message})
    }
    return res.status(401).send({status: 401, message: "An error has occured"})
})


router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email: email});

    if(user === null) return res.status(400).send({status: 400, message: 'User does not exist'})
    if(user.password !== password)  return res.status(400).send({status: 400, message: 'Password is incorrect'})

    return res.status(200).send({status: 200, message: "Login success", data: user})
})

router.get('/addProduct', async (req, res) => {
    res.send('ok')

    // const product = new Product(req.body);
    // try {
    //     await product.save();
    //     return res.status(200).send({status: 200, message: "Product successfully added"})
    // } catch (error) {
    //     return res.status(400).send({status: 400, message: error.message})
    // }
    // return res.status(401).send({status: 401, message: "An error has occured"})
})

module.exports = router;