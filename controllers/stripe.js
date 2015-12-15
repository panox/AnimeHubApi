var stripe = require('stripe')(process.env.StripeTestSecretKey);

stripe.charges.create({
  amount: 400,
  currency: "gbp",
  description: "Charge for test@example.com"
}, function(err, charge) {
  console.log(charge)
});