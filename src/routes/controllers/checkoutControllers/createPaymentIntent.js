import Stripe from 'stripe';

import * as dotenv from 'dotenv';

dotenv.config();

// creating a stripe instance 
const stripe = new Stripe(process.env.STRIPE_API_KEY);

const calculateOrderAmount = (items) => {
	// Replace this constant with a calculation of the order's amount
	// Calculate the order total on the server to prevent
	// people from directly manipulating the amount on the client
	return 1400;
};

const createPaymentIntent = async (req, res) => {
    const { items } = req.body;

	// Create a PaymentIntent with the order amount and currency
	const paymentIntent = await stripe.paymentIntents.create({
		amount: 1400, // dummy data; this data either will be calculated using calculateOrderAmount or sent from front end
		currency: 'usd',
		payment_method_types: ['card'],
	});

	res.send({
		clientSecret: paymentIntent.client_secret,
	});
}

export default createPaymentIntent;