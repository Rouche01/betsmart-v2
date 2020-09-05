/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/




var express = require('express')
var bodyParser = require('body-parser')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
var paystack = require('paystack-api')(process.env.PAYSTACK_SECRET_KEY)

// declare a new express app
var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
});



/****************************
* Example post method *
****************************/

app.post('/checkout', async function(req, res) {
  let amount;
  if(req.body.plan === 'single') {
    amount = 300000;
    plan = 'PLN_e0bcgn58im1x3v0';
  } else {
    amount = 700000;
    plan = 'PLN_7su20v6k71534wg';
  }
  try {
    const session = await paystack.transaction.initialize({
      email: req.body.email,
      amount: amount,
      plan: plan,
      transaction_charge: 5000

    });
    console.log(session);
    res.json(session);
  } catch(error) {
    res.json(error);
    console.log(error);
  }
})


app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
