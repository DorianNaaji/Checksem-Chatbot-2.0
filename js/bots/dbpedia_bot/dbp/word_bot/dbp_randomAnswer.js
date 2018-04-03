class dbp_randomAnswer
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

        this._sent = '<li class="word-bot-sent">';
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

    randomRemarkDefinition()
    {
        let result = this._sent;
        result += '<img src="img/logos/chatbot.png" alt ="" />';

        let rand = Math.floor((Math.random() * 5) + 1);
        switch(rand)
        {
            case 1:
                result += '<p> Is there another definition you want to know ?  &nbsp;';
                result += this._smile2;
                break;
            case 2:
                result += '<p> Seems a bit complicated... Do you want me to define another word ?  &nbsp;';
                result += this._perplex;
                break;
            case 3:
                result += '<p> You can also ask me for translations and synonyms ! &nbsp;';
                result += this._wink;
                break;
            case 4:
                result += '<p> Atleast tell me I learnt you something ! Searching definitions is exhausting &nbsp;';
                result += this._laughing;
                break;
            case 5:
                result += '<p> It seems so easy to me. I know everything. &nbsp;';
                result += this._smirking;
                break;
        }
        result+= '</p></li>' ;
        return result;
    }

    randomRemarkTranslation()
    {
        let result = this._sent;
        result += '<img src="img/logos/chatbot.png" alt ="" />';

        let rand = Math.floor((Math.random() * 5) + 1);
        switch(rand)
        {
            case 1:
                result += '<p> I know so much things &nbsp;';
                result += this._smirking;
                break;
            case 2:
                result += '<p> You are gonna learn some new vocabulary thanks to me ! &nbsp;';
                result += this._cringed;
                break;
            case 3:
                result += '<p> These languages are so easy to me... Go on, ask me something !  &nbsp;';
                result += this._smile2;
                break;
            case 4:
                result += '<p> I know so much things &nbsp;';
                result += this._smile;
                break;
            case 5:
                result += '<p> You can also ask me for definitions and synonyms ! &nbsp;';
                result += this._wink;
                break;
        }
        result+= '</p></li>' ;

        return result;
    }

    randomRemarkRelativeWords()
    {
        let result = this._sent;
        result += '<img src="img/logos/chatbot.png" alt ="" />';

        let rand = Math.floor((Math.random() * 5) + 1);
        switch(rand)
        {
            case 1:
                result += '<p> You are gonna learn some new vocabulary thanks to me ! &nbsp;';
                result += this._cringed;
                break;
            case 2:
                result += '<p> Those words are not familiar at all to me. &nbsp;';
                result += this._thinking;
                break;
            case 3:
                result += '<p> Maybe you want me to search for something else ? &nbsp;';
                result += this._smile;
                break;
            case 4:
                result += '<p> I can also give you definitions and translations ! &nbsp;';
                result += this._wink;
                break;
            case 5:
                result += "<p> I hope you've atleast learnt something ! ";
                result += this._smile2;
                break;
        }
        result+= '</p></li>' ;
        return result;
    }
}