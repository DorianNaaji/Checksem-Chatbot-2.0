class accuweather_result_parser
{
    constructor()
    {
        this._answers = new accuweather_answer();
        this._chat = new weather_chat();
        this._strManager = new manage_str();
        this._sent = '<li class="weather-bot-sent">';
    }

    callbackQueryWeatherTownCurrent(response)
    {
        console.log(response);
        let weatherSituation = [];
        let icons = [];
        let weather = [];

        weather["city"] = response.name;
        weather["cloudiness"] = response.clouds.all;
        weather["wind"] = response.wind.speed;
        weather["temperature"] = response.main.temp;
        weather["humidity"] = response.main.humidity;

        console.log(weather);
        for(let i = 0; i < response.weather.length; i++ )
        {

            weatherSituation.push(response.weather[i].main);
            icons.push(response.weather[i].icon);
        }
        let message = this._answers.weather(weatherSituation, icons, weather);
        this._chat.appendNewMessageRobot(message);
        this._chat.appendNewMessageRobot(this._answers.randomRemarks());


        // faire le callback en fonction
        // des clés du JSON

    }

    informError(log)
    {
        this._chat.appendRawMessageRobot("Something went wrong. Check your town spelling or rephrase :)");
    }
}