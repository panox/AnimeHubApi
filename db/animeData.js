var request = require('request');

var data = {
  grant_type    : "client_credentials",
  client_id     :  process.env.ClientID,
  client_secret :  process.env.ClientSecret,
}

var url = 'https://anilist.co/api/auth/access_token';

request.post(url, { form: data }, function (error, response, body) {
    console.log(body)
  }
);