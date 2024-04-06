const router = require('express').Router();
const Order = require('../schema/order')
const Product = require('../schema/product')
const { createPaymentSession, retrieveSessionDetails } = require('../stripe');
const { checkAuth } = require('../middleware/check-auth')


router.use((req, res, next) => {
    next();
})

router.get('/', (req, res) => {
    res.send('Order api working')
})

router.post('/purchase', checkAuth('U'), async (req, res) => {
    try {
        const { product_id, quantity, router } = req.body
        const product = await Product.findOne({_id: product_id})
        if(product === null) throw new Error('Invalid product')
        const price = product.productPrice * quantity
        console.log(product)
        const items = {
            name: product.productName,
            description: product.productDescription,
            quantity: quantity,
            price: product.productPrice,
            cancel_url: router
        }
        console.log(items)

        const user = res.userData
        const session = await createPaymentSession(items, user.email)
        const order_data = {
            billing_address: user.address,
            total_amount: price,
            quantity: quantity,
            user_id: user._id,
            product_id: product_id,
            session_id: session.id
        }
        const order = new Order(order_data);
        await order.save();
        return res.status(200).send({status: 200, message: 'Order created', data: { url: session.url }})
    } catch (error) {
        console.log(error)
        return res.status(400).send({status: 400, message: error.message})
    }
})


// Updates the order to completion
router.post('/update-order', async (req, res) => {
    try {
        const session_id = req.body.id
        const order = await Order.findOne({session_id: session_id})
        if(order === null) throw new Error('Invalid order id')
        // if(order.status !== 'pending') throw new Error('Order can no longer be updated')
        const { status, receipt } = await retrieveSessionDetails(session_id)
        await Order.findOneAndUpdate({session_id: session_id},{
            updated_date: new Date(),
            status: status,
            receipt_url: receipt, 
        })
        return res.status(200).send({status: 200, message: 'Order status updated' })
    } catch(error){
        return res.status(400).send({status: 400, message: error.message})
    }
})

// Get all orders
router.get('/getOrders', async (req, res) => {
    try {
        const orders = await Order.find({ status: 'complete' });
        return res.status(200).send({ status: 200, message: "Complete Orders Retrieved", data: orders });
    } catch (error) {
        console.error(error);
        return res.status(400).send({ status: 400, message: error.message });
    }
});

module.exports = router;