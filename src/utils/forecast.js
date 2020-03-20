const request = require("request");

const forecast = (latitude, longitude, location, callback) => {
  const url = `https://api.darksky.net/forecast/53e8767f520f21990249a70cccdf8272/${latitude},${longitude}?units=si`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather services!", undefined);
    } else if (body.error) {
      callback("Unable to find location weather.", undefined);
    } else {
      callback(
        undefined,
        `currently in ${location}, it is ${
          body.currently.temperature
        } degrees celsius outside and there is ${body.currently
          .precipProbability * 100}% chance of ${body.currently.precipType}.`
      );
    }
  });
};

module.exports = forecast;
