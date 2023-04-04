const express = require("express");
const router = express.Router();
const braintree = require("braintree");

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "ffywjnhpc67dmvyt",
  publicKey: "6bnv9cd94rxp54vv",
  privateKey: "7fe729bd65c4c00956d166d2d5be3d79",
});

exports.getToken = (req, res) => {
  gateway.clientToken.generate({}, function (err, response) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(response);
    }
  });
};

exports.processPayment = (req, res) => {
  let nonceFromTheClient = req.body.paymentMethodNonce;
  let amountFromTheClient = req.body.amount;

  gateway.transaction.sale(
    {
      amount: amountFromTheClient,
      paymentMethodNonce: nonceFromTheClient,

      options: {
        submitForSettlement: true,
      },
    },
    function (err, results) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(results);
      }
    }
  );
};
