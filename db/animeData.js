var request = require('request-json');
//data to get token
var data = {
  grant_type    : "client_credentials",
  client_id     :  process.env.ClientID,
  client_secret :  process.env.ClientSecret,
}
// client url
var client = request.createClient('https://anilist.co/api/');
//post to get token back
client.post('auth/access_token', data, function(err, res, body) {
  var clientToken = body["access_token"];
  var sendClientToken = '?access_token=' + clientToken
  var params = 
    '&season=fall' +
    '&sort=score-desc' +
    '&type=TV' +
    '&status=Currently%20Airing'
  var getUrl = 'browse/anime' + sendClientToken + params

  
  
  // //get all anime with url params
  // client.get(getUrl, function(err, res, body) {
  //   // loop request for every anime from browse response
  //   for (var i = body.length - 1; i >= 0; i--) {
  //     var animeId = body[i].id
  //     var url = 'anime/' + animeId + sendClientToken
  //     // get data for each anime by get request
  //     client.get(url, function(err, res, body) {
  //       console.log(body)
  //     })
  //   };
  // });
});

