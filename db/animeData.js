var express        = require('express');
var bodyParser     = require('body-parser');
var app            = express();
var request = require('request');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var data = {
  grant_type    : "client_credentials",
  client_id     :  process.env.ClientID,
  client_secret :  process.env.ClientSecret,
}

var url = 'https://anilist.co/api/auth/access_token';

request.post(url, { form: data }, function (error, response, body) {
    console.log(body)
    console.log(typeof body)
    console.log(body["access_token"])
  }
);