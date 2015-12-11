var request = require('request');
request.post('http://localhost:3000/api/login', 
  {email: "ll@ga.co", password: "password"}, 
  function (error, res, body) {
  
});