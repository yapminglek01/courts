const Stripe = require('stripe');
const stripe = Stripe('sk_test_51OD60zLeBMspac8v5EFucHIYPvCwmfk7qev2Qio7VvB4j7cS1cTZFbyWR2ApiiHXJ7d02rWsW9OUJmlYQ4azcIrs007KoeOqPn');

async function createPaymentSession(item, email){
    const host = "http://localhost:4200/"
    return await stripe.checkout.sessions.create({
        success_url: `${host}/payment?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${host}${item.cancel_url}`,
        customer_email: email,
        line_items: [
          {
            price_data: {
                currency: 'myr',
                product_data: {
                    name: item.name,
                    description: item.description || ' '
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
          },
        ],
        mode: 'payment',
    });
}

async function retrieveSessionDetails(session_id){
    const session = await stripe.checkout.sessions.retrieve(session_id);
    const status = 
    session.status === 'complete' ? 'complete'
    : session.status === 'expired' ? 'cancel'
    : 'pending'
    if(status != 'complete') return { status: status, receipt: '' }
    const paymentIntent = await stripe.paymentIntents.retrieve(session.payment_intent);
    const charge = await stripe.charges.retrieve(paymentIntent.latest_charge);
    return { status: status, receipt: charge.receipt_url }
}

module.exports = {
    createPaymentSession,
    retrieveSessionDetails
}