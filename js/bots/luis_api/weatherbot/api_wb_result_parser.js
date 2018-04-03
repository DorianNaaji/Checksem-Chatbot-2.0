class api_wb_result_parser
{
    constructor()
    {
        this._chat = new weather_chat();
        this._answers = new accuweather_answer();
        this._requests = new accuweather_request();
    }

    /**
     * parsing with given json
     * @param str
     */
    parse(str)
    {
        let jsonObj = str;
        //console.log(jsonObj);
        let intent = jsonObj.topScoringIntent.intent;

        switch(intent)
        {
            case "greet_user":
                this._chat.appendNewMessageRobot(this._answers.greet());
                break;
            case "weather_town":
                let cities = [];
                let dates = [];
                for(let i = 0; i < jsonObj.entities.length; i++)
                {
                    if(jsonObj.entities[i].type === 'city')
                    {
                        cities.push(jsonObj.entities[i].entity);
                    }
                    if(jsonObj.entities[i].type === 'city_composite')
                    {
                        cities.push(jsonObj.entities[i].entity);
                    }
                    if(jsonObj.entities[i].type === 'builtin.datetimeV2.date' || jsonObj.entities[i].type === 'builtindatetimeV2.daterange' )
                    {
                        dates.push(jsonObj.entities[i].resolution);
                    }
                }
               // console.log(dates);
                if (dates.length === 0)
                {
                    this._requests.queryWeatherTownCurrent(cities);
                }
                else if (dates.length > 0)
                {
                    this._requests.queryWeatherTown(cities, dates);
                }
                if (cities.length === 0)
                {
                    this._chat.appendNewMessageRobot(this._answers.iNeedTown());
                }

                break;
            case "current_weather_no_town":
                this._chat.appendNewMessageRobot(this._answers.iNeedTown());
                break;
            case "None":
                this._chat.appendRawMessageRobot("I'm sorry but I could not understand your question ! Please rephrase :D");
        }
    }

    informError(log)
    {
        this._chat.appendRawMessageRobot("Something went wrong from server side, please re-phrase your question or contact an administrator :)");
    }
}