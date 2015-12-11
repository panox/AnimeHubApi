var request = require('request');
request.get('https://api.doughnuts.ga/doughnuts', function (error, res, body) {
  console.log(body)
})