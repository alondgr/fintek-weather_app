const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const axios = require('axios');
const date = require('date-and-time');
const { json } = require('express/lib/response');

async function search(req, res) {
    const location = req.params.location;
    const weatherUrl = `http://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${location}&aqi=no&alerts=no&days=2`
    axios.get(weatherUrl)
        .then((response) => {


            const cityFound = response.data;
            const now = new Date(cityFound.location.localtime);

            const weather = {
                name: cityFound.location.name,
                country: cityFound.location.country,
                condition: cityFound.current.condition.text,
                wind: cityFound.current.wind_kph,
                precipitation: cityFound.current.precip_mm,
                humidity: cityFound.current.humidity,
                temp_c: cityFound.current.temp_c,
                localtime: date.format(now, 'DD/M/YY') + ' at ' + date.format(now, 'HH:mm'),
                latitude: cityFound.location.lat,
                longitude: cityFound.location.lon,
                accurateTo: date.format(now, 'DD/MM/YY') + ' at ' + date.format(now, 'HH:mm'),
            }


            const nowHour = now.getHours();
            if (nowHour + 4 > 23) {
            }
            const hours = Array(5).fill().map((e, i) => {
                let element;
                console.log(nowHour, i)
                if (nowHour + i > 23) {
                    element = cityFound.forecast.forecastday[1].hour[nowHour + i - 24]
                } else {
                    element = cityFound.forecast.forecastday[0].hour[nowHour + i]
                }
                return {
                    hour: element.time,
                    temp_c: element.temp_c
                }
            })
            console.log(hours);
            res.json({ weather, hours })

        })
        .catch(function (error) {
            console.log('ERROR! :  ' + error);
            res.status(400).json({ error });
        })
};

module.exports = { search };
