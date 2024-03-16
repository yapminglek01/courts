const router = require('express').Router();
const User = require('../schema/user')
const { checkAuth, signToken } = require('../middleware/check-auth')
const { validatePassword, encryptPassword } = require('../middleware/bcrypt')
//const Order = require('../schema/order')


router.use((req, res, next) => {
    next();
})

router.get('/test', (req, res) => {
    res.send('hello')
})

router.post('/register', async (req, res) => {
    const user = new User(req.body);
    user.password = await encryptPassword(user.password)
    try {
        await user.save();
        return res.status(200).send({status: 200, message: "Account registered successfully"})
    } catch (error) {
        return res.status(400).send({status: 400, message: error.message})
    }
})


router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email: email});

    if(user === null) return res.status(400).send({status: 400, message: 'User does not exist'})


    const result = await validatePassword(password, user.password)
    if(!result) return res.status(400).send({status: 400, message: 'Username or password is incorrect'})

    const token = signToken(user);

    const data = {
        user: user,
        token: token
    }

    return res.status(200).send({status: 200, message: "Login success", data: data})
})

router.post('/update-password', checkAuth(), async (req, res) => {
    const user = res.userData // from token
    const { oldPassword, newPassword } = req.body
    try {
        const current = await User.findOne({_id: user._id})
        const passMatch = await validatePassword(oldPassword, current.password)
        if(!passMatch) throw new Error('Old Password does not match')
        const new_password = await encryptPassword(newPassword)
        const result = await User.findOneAndUpdate({_id: user._id}, {password: new_password})
        if(result === null) return res.status(400).send({status: 400, message: 'An error occured'})
        return res.status(200).send({status: 200, message: 'Password successfully updated'})
    } catch (error) {
        return res.status(400).send({status: 400, message: error.message})
    }
});


module.exports = router;