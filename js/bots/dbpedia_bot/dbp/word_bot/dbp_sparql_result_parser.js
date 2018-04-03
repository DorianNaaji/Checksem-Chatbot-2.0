class dbp_sparql_result_parser
{
    /**
     *
     */
    constructor()
    {
        this._answers = new dbp_randomAnswer();
        this._chat = new chat();
        this._strManager = new manage_str();
       // this._d3 = new d3tree();
        this._sent = '<li class="word-bot-sent">';
    }

    /**
     *
     * @param str
     */
    callbackDefinition(str)
    {
        let jsonObj = eval('(' + str + ')');
        let result = this._sent;
        result += '<img src="img/logos/chatbot.png" alt="" />';
        try
        {
            result += "<p><bold><u> DEFINITION</u> : </bold>";
            result += jsonObj.results.bindings[0].def.value + "</p>";
        }
        catch(e)
        {
            console.log(e);
            result += "No definitions found for this word... Try with another one or check the spelling";
        }
        result += "</li>";

        this._chat.appendNewMessageRobot(result);
        this._chat.appendNewMessageRobot(this._answers.randomRemarkTranslation());

        // displayDefinitionDialog in dpb_random answer
    }

    /**
     *
     * @param str
     */
    callbackTranslation(str)
    {
        let jsonObj = eval('(' + str + ')');
        let result = this._sent;

        result += '<img src="img/logos/chatbot.png" alt="" />';
        result += '<table class="container" id="trad">';
        result += "<tr> <td> TRANSLATION </td> <td> LANGUAGE </td> </tr>";

        if (jsonObj.results.bindings.length === 0)
        {
            result += "<tr><td> No Translations found for this word... Try with another one or check the spelling</td>";
            result += "<td> none </td></tr>";
        }
        else
        {
            for (var i = 0; i < jsonObj.results.bindings.length; i++)
            {
                result += " <tr><td>" + jsonObj.results.bindings[i].trad.value;
                let language = this._strManager.LanguageTagToLanguageStr(jsonObj.results.bindings[i].lang.value);
                result += " </td><td>" + '<img src="img/flags/' + jsonObj.results.bindings[i].lang.value + '.png"> ' + language;
                result += " </td></tr>";
            }
        }
        result += "</table>";
        result += "</li>";
        this._chat.appendNewMessageRobot(result);
        this._chat.appendNewMessageRobot(this._answers.randomRemarkTranslation());
    }

    callbackSubject(str, word)
    {
        let jsonObj = eval('(' + str + ')');

        let result = '<img src="img/logos/chatbot.png" alt="" />';
        if (jsonObj.results.bindings.length === 0)
        {
            result += "<p> No synonyms / related words found for this word... Try with another one or check the spelling</p>";
        }
        else
        {
            let d3Object = {};
            d3Object.name = [word];
            d3Object.parent = ['null'];
            d3Object.children = [];

            for(let i = 0; i < jsonObj.results.bindings.length; i++)
            {
                let cleanWord = jsonObj.results.bindings[i].subject.value.replace('http://dbpedia.org/resource/Category:', '');
                cleanWord = this._strManager.replaceAll(cleanWord, '_', '');
                d3Object.children.push({});
                d3Object.children[i]['name'] = cleanWord;
                d3Object.children[i]['parent'] = word;
            }
            var jsonString = JSON.stringify(d3Object);
            appendTree(jsonString);
            //this._d3.appendTree(jsonString);
        }

        this._chat.appendNewMessageRobot(this._answers.randomRemarkRelativeWords());
    }


    /**
     *
     * @param log
     */
    informError(log)
    {
        this._chat.appendRawMessageRobot("Something went wrong from server side, please re-phrase your question or contact an administrator :)");
    }

}