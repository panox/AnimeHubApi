var request = require('request');
request('https://api.doughnuts.ga/doughnuts', function (error, res) {
  console.log(res)
})