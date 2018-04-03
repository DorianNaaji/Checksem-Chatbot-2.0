class accuweather_request
{
    constructor()
    {
        this._parser = new accuweather_result_parser();
        this._chat = new weather_chat();
    }

    queryWeatherTownCurrent(cities)
    {
        for (let i = 0; i < cities.length; i++)
        {
            let that = this;
            let queryURL = "http://api.openweathermap.org/data/2.5/weather?q=";
            queryURL += cities[i];
            queryURL +="&APPID=*******";
            $.ajax
            ({
                dataType: "json",
                url: queryURL,
                success: (response) =>
                {
                    this._parser.callbackQueryWeatherTownCurrent(response);
                },
                error: (log) =>
                {
                    that._parser.informError(log);
                },
            });

        }
    }

    queryWeatherTown(cities, dates)
    {
        //TODO
        this._chat.appendRawMessageRobot("I can't make weather forecasts yet... Try again later ;) ");
    }

    // forecast sur 5 jours, update toutes les 3h
    // http://api.openweathermap.org/data/2.5/forecast?q=Paris&APPID=1d363cbc197ac4d27ad9ae40ff2dd03a



}