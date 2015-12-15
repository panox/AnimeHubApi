var stripe = require('stripe')(process.env.StripeTestSecretKey);

stripe.charges.create({
  amount: 400,
  currency: "gbp",
  source: "tok_17IKIZA9VROQGHUtuB7vZQY3",
  customer: "cus_7XPJJLaVUDUJAB"
}, function(err, charge) {
  console.log('Error', err)
  console.log('Charge:', charge)
});