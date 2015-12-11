var request = require('request-json');

var data = {
  grant_type    : "client_credentials",
  client_id     :  process.env.ClientID,
  client_secret :  process.env.ClientSecret,
}

var client = request.createClient('https://anilist.co/api/');
var allIds = [];

client.post('auth/access_token', data, function(err, res, body) {
  var clientToken = body["access_token"];
  var sendClientToken = 'access_token=' + clientToken
  var sorting = 
    '&season=fall' +
    '&sort=score-desc' +
    '&type=TV' +
    '&status=Currently%20Airing'
  var getUrl = 'browse/anime?' + sendClientToken + sorting
  client.get(getUrl, function(err, res, body) {
    for (var i = body.length - 1; i >= 0; i--) {
      allIds.push(body[i].id)
    };
  });
});

