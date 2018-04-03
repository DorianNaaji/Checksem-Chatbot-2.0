class curr_answer
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

        this._sentAndImg = '<li class="curr-bot-sent"><img src="img/logos/chatbot.png" alt ="" />';

        this._chat = new curr_chat();
    }



    answerUserInstant()
    {
        let result = this._sentAndImg;

        let rand = Math.floor((Math.random() * 5) + 1);

        switch(rand)
        {
            case 1:
                result += '<p> Let me find that for you &nbsp;';
                result += this._wink;
                break;
            case 2:
                result += '<p> I must do some calculations ... &nbsp;';
                result += this._cringed;
                break;
            case 3:
                result += '<p> Let me find this out ... &nbsp;';
                result += this._thinking;
                break;
            case 4:
                result += '<p> Wait a moment ... &nbsp;';
                result += this._cringed;
                break;
            case 5:
                result += '<p> Seems to be an easy conversion &nbsp;';
                result += this._smile2;
                break;
        }
        result+= '</p></li>' ;
        return result;
    }

    answerUserMoney(convertedFromTo)
    {
        let result = this._sentAndImg;

        let rand = Math.floor((Math.random() * 3) + 1);

        switch(rand)
        {
            case 1:
                result += '<p> So, ' + Math.round(convertedFromTo["amountFrom"] * 100)/100 + ' ' + convertedFromTo["from"] +
                    ' is worth <b>' + Math.round(convertedFromTo["amountTo"] * 100)/100 + ' ' + convertedFromTo["to"] + '</b>&nbsp;';
                result += this._wink;
                break;
            case 2:
                result += '<p> So, ' + Math.round(convertedFromTo["amountFrom"] * 100)/100 + ' ' + convertedFromTo["from"] +
                    ' is worth <b>' + Math.round(convertedFromTo["amountTo"] * 100)/100 + ' ' + convertedFromTo["to"] + '</b>&nbsp;';
                result += this._smile2;
                break;
            case 3:
                result += '<p> So the result is that ' + Math.round(convertedFromTo["amountFrom"] * 100)/100 + ' ' + convertedFromTo["from"] +
                    ' is worth <b>' + Math.round(convertedFromTo["amountTo"] * 100)/100 + ' ' + convertedFromTo["to"] + '</b>&nbsp;';
                result += this._thinking;
                break;
        }
        result+= '</p></li>' ;
        return result;

    }
}