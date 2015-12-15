var stripe = require('stripe')(process.env.StripeTestSecretKey);

var stripeToken = request.body.stripeToken;

var charge = stripe.charges.create({
  amount: 1000, // amount in cents, again
  currency: "gbp",
  source: stripeToken,
  description: "Donation Charge"
}, function(err, charge) {
  if (err && err.type === 'StripeCardError') {
    // The card has been declined
    console.log('Error', err)
  }
  else {
    console.log('Charge:', charge)
  }
  
});