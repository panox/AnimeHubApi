var request = require('request-json');

var data = {
  grant_type    : "client_credentials",
  client_id     :  process.env.ClientID,
  client_secret :  process.env.ClientSecret,
}

var client = request.createClient('https://anilist.co/api/');

client.post('auth/access_token', data, function(err, res, body) {
  var clientToken = body["access_token"];
  var getUrl = 'anime/1' + '?access_token=' + clientToken
  client.get(getUrl, function(err, res, body) {
    console.log(body);
  });
});