var request = require('request');

var data = {
  "email":"ll@ga.co", 
  "password":"password"
}

var url = 'http://localhost:3000/api/login';

request.post(url, { form: data }, function (error, response, body) {
    console.log(body)
  }
);