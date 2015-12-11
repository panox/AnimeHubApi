var http = require('http');

//The url we want is `www.nodejitsu.com:1337/`
var options = {
  host: 'www.nodejitsu.com',
  path: '/',
  //This is what changes the request to a POST request
  method: 'POST'
};

callback = function(response) {
  console.log(response)
}

http.request(options, callback);