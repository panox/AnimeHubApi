const request = require('request-json');

let Token = {
  data: {
    grant_type    : "client_credentials",
    client_id     :  process.env.ClientID,
    client_secret :  process.env.ClientSecret
  },
  getAniToken: function (callback) {
    // client url
    let client = request.createClient('https://anilist.co/api/');
    //post to get token back
    client.post('auth/access_token', Token.data, function(err, res, body) {
      if (err) return console.log(err); //error

      let clientToken = body.access_token;
      let sendClientToken = '?access_token=' + clientToken;

      callback(sendClientToken, client);

      console.log("Process Complete");
    });
  }

};

module.exports = Token;
