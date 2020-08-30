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
var aws = require('aws-sdk');

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

var ses = new aws.SES({region: 'us-east-2'});


/****************************
* Example post method *
****************************/

app.post('/sendEmail', async function(req, res) {
  // Add your code here
  // res.json({success: 'post call succeed!', url: req.url, body: req.body})
  var params = {
    Destination: {
      ToAddresses: ['richardemate@gmail.com']
    },
    Message: {
      Body: {
        Text: {
          Data: `Phone Number: ${req.body.supportNum}, Message: ${req.body.supportMsg}`
        }
      },
      Subject: {
        Data: req.body.supportSbj
      }
    },
    Source: "admin@betsmart.com.ng"
  };

  try {
    await ses.sendEmail(params).promise();
    console.log('email sent');
  } catch(err) {
    console.log(err, 'This is an error');
  }
});



app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
