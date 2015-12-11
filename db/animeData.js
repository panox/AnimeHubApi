var request = require('request-json');

var data = {
  grant_type    : "client_credentials",
  client_id     :  process.env.ClientID,
  client_secret :  process.env.ClientSecret,
}

var client = request.createClient('https://anilist.co/api/');

client.post('auth/access_token', data, function(err, res, body) {
  var clientToken = body["access_token"];
  var getUrl = 'browse/anime' + '?access_token=' + clientToken +
  '&season=fall&sort=score-desc&type=TV&&status=Currently%20Airing'
  client.get(getUrl, function(err, res, body) {
    console.log(body);
  });
});