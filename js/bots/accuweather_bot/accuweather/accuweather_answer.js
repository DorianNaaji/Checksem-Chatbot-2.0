class accuweather_answer
{
    constructor()
    {
        this._smileyStyle = 'style="float:right;margin:0 5px 0 0;"';
        this._wink = '<img src="img/emojis/wink.png" alt=""' + this._smileyStyle + '/>';

        this._cringed = '<img src="img/emojis/cringed.png" alt=""' + this._smileyStyle + '/>';
        this._laughing = '<img src="img/emojis/laughing.png" alt=""' + this._smileyStyle + '/>';
        this._perplex = '<img src="img/emojis/perplex.png" alt=""' + this._smileyStyle + '/>';
        this._smile = '<img src="img/emojis/smile.png" alt=""' + this._smileyStyle + '/>';
        this._smile2 = '<img src="img/emojis/smile2.png" alt=""' + this._smileyStyle + '/>';
        this._thinking = '<img src="img/emojis/thinking.png" alt=""' + this._smileyStyle + '/>';
        this._smirking = '<img src="img/emojis/smirking.png" alt=""' + this._smileyStyle + '/>';

        this._sent = '<li class="weather-bot-sent">';


        this._chat = new weather_chat();
    }


    preMessageWeather(weather)
    {
        let result = this._sent;
        result += '<img src="img/logos/chatbot.png" alt ="" />';
        result += '<p> This is the weather I have found for ' + weather["city"] + ' : &nbsp;';
        result += '</p></li>' ;
        this._chat.appendNewMessageRobot(result);
    }

    weather(weatherSituation, ico, weather)
    {
        this.preMessageWeather(weather);
        let result = this._sent;
        result += '<table class="container">';
        for(let i = 0; i < weatherSituation.length; i++)
        {
            result += '<tr> <td>Current weather</td><td>'  + weatherSituation[i] + '<img class="tImage" src="http://openweathermap.org/img/w/' + ico[i] + '.png"' + ' alt="" /></center></td></tr>';
        }


        let kTemperature = weather["temperature"];
        let fTemperature = Math.round((kTemperature * 9/5) - 459.67);
        result += '<tr><td> Temperature (°F) </td>';
        result += '<td>' + fTemperature + '</td>';
        result += '</tr>';

        let kTemperature2 = weather["temperature"];
        let cTemperature = Math.round(kTemperature2 - 273.15);

        result += '<tr><td> Temperature (°C) </td>';
        result += '<td>' + cTemperature + '</td>';
        result += '</tr>';

        result += '<tr><td> Humidity (%) </td>';
        result += '<td>' + weather["humidity"] + '</td>';
        result += '</tr>';

        result += '<tr><td> Wind Speed (m/s) </td>';
        result += '<td>' + weather["wind"] + '</td>';
        result += "</tr>";


        result += '<tr><td> Cloudiness (%) </td>';
        result += '<td>' + weather["cloudiness"] + '</td>';
        result += '</tr>';

        result += '</li>' ;
        result += '</table>';
        return result;
    }

    greet()
    {
        let result = this._sent;
        result += '<img src="img/logos/chatbot.png" alt ="" />';

        let rand = Math.floor((Math.random() * 5) + 1);

        switch(rand)
        {
            case 1:
                result += '<p> Hello ! Feel free to ask me something &nbsp;';
                result += this._wink;
                break;
            case 2:
                result += '<p> Hey there &nbsp;';
                result += this._smile2;
                break;
            case 3:
                result += '<p> Hello ! Ready to learn something ? &nbsp;';
                result += this._cringed;
                break;
            case 4:
                result += '<p> Hey ! &nbsp;';
                result += this._smile2;
                break;
            case 5:
                result += '<p> Hello ! &nbsp;';
                result += this._wink;
                break;
        }
        result+= '</p></li>' ;
        return result;
    }

    iNeedTown()
    {
        let result = this._sent;
        result += '<img src="img/logos/chatbot.png" alt ="" />';

        let rand = Math.floor((Math.random() * 5) + 1);

        switch(rand)
        {
            case 1:
                result += '<p> In order to answer you, I would need a town &nbsp;';
                result += this._smile2;
                break;
            case 2:
                result += '<p> Re-answer me but give me a town this time ! &nbsp;';
                result += this._smile2;
                break;
            case 3:
                result += '<p> I could answer you but you will have to re-answer me your question with town(s) name(s)  &nbsp;';
                result += this._cringed;
                break;
            case 4:
                result += '<p> Give me the name(s) of the town(s) in which you want to know the weather first &nbsp;';
                result += this._smile2;
                break;
            case 5:
                result += '<p> I need a town first ! &nbsp;';
                result += this._wink;
                break;
        }
        result+= '</p></li>' ;
        return result;
    }

    randomRemarks()
    {
        let result = this._sent;
        result += '<img src="img/logos/chatbot.png" alt ="" />';

        let rand = Math.floor((Math.random() * 5) + 1);
        switch(rand)
        {
            case 1:
                result += '<p> If there is something else you want to know, just ask &nbsp;';
                result += this._cringed;
                break;
            case 2:
                result += '<p> Interesting weather &nbsp;';
                result += this._thinking;
                break;
            case 3:
                result += '<p> Want to know the weather for another town ? &nbsp;';
                result += this._smile;
                break;
            case 4:
                result += '<p> I know the weather of every town in the world &nbsp;';
                result += this._wink;
                break;
            case 5:
                result += "<p> I hope I helped you ";
                result += this._smile2;
                break;
        }
        result+= '</p></li>' ;
        return result;
    }
}