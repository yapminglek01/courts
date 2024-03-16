const router = require('express').Router();
const User = require('../schema/user')
//const Order = require('../schema/order')


router.use((req, res, next) => {
    next();
})

router.get('/test', (req, res) => {
    res.send('hello')
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

router.post('/verify-old-password', async (req, res) => {
    try {
        const { oldPassword } = req.body;
        const userId = req.user.id;

        // Fetch the user from the database
        const user = await User.findById(userId);

        // Check if the old password matches the stored password
        const passwordMatch = await bcrypt.compare(oldPassword, user.password);

        if (passwordMatch) {
            res.status(200).json({ valid: true });
        } else {
            res.status(400).json({ valid: false });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to verify old password' });
    }
});

router.post('/update-password', async (req, res) => {
    try {
        const { newPassword } = req.body;
        const userId = req.user.id;

        // Hash the new password before updating
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update user's password in the database
        const updatedUser = await User.findByIdAndUpdate(userId, { password: hashedPassword }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'Password updated successfully', user: updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update password' });
    }
});


module.exports = router;