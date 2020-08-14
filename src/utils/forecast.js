const request = require('request');

const forecast = (latitude,longitude,callback) => {

    const url = "http://api.weatherstack.com/current?access_key=588dabf1656ba2e294a258327a8c0524&query=" +longitude+ "," +latitude+ "&units=m";
    request({url,json:true},(error,{body} = {}) => {
        //const {body} = response;
        if(error)
        {
            callback("Unable to connect to the service",undefined);
        }
        else if(body.error)
        {
            callback('Unable to get the forecast for the given location!',undefined);
        }
        else
        {
            const description = body.current.weather_descriptions;
            const temperature = body.current.temperature;
            const feelslike = body.current.feelslike
            callback(undefined,description+" It is currently "+temperature+" but it feels like "+feelslike);
        }
    });
};

module.exports = forecast;