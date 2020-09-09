/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/



var aws = require('aws-sdk')
var express = require('express')
var bodyParser = require('body-parser')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

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

const cognitoidentityserviceprovider = new aws.CognitoIdentityServiceProvider({ apiVersion: '2016-04-18' });


/****************************
* Example post method *
****************************/

app.post('/customerUpdate', async function(req, res) {
  // Add your code here
  // res.json({success: 'post call succeed!', url: req.url, body: req.body})
  const params = {
    UserAttributes: [
      {
        Name: 'custom:payment-status',
        Value: 'success'
      },
      {
        Name: 'custom:next-payment-date',
        Value: req.body.date,
      }
    ],
    UserPoolId: 'us-east-2_HlU6pAYaT',
    Username: req.body.email
  }

  
  try {
    const data = await cognitoidentityserviceprovider.adminUpdateUserAttributes(params).promise();
    console.log(data);
  } catch(err) {
    console.log(err);
  }

  // res.sendStatus(200);
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
