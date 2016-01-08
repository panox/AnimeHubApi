var Token = {
  data: {
    grant_type    : "client_credentials",
    client_id     :  process.env.ClientID,
    client_secret :  process.env.ClientSecret
  }
};

module.exports = Token;
