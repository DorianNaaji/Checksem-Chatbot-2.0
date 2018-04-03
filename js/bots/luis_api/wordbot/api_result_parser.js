class api_result_parser
{
    constructor()
    {
        this._chat = new chat();
        this._answers = new dbp_randomAnswer();
        this._sparql = new dbp_sparql_request();
    }

    /**
     * parsing
     * @param str
     */
    parse(str)
    {
        let jsonObj = str;
        console.log(jsonObj);
        let intent = jsonObj.topScoringIntent.intent;
        let researchedWord = "";

        switch(intent)
        {
            case "greet_user":
                this._chat.appendNewMessageRobot(this._answers.greet());
                break;
            case "search_word_definition":
                try
                {
                    researchedWord = jsonObj.entities[0].entity;
                    this._sparql.querySparqlDefinition(researchedWord);
                }
                catch(e)
                {
                    this._chat.appendRawMessageRobot("Unfortunately, I could not understand your question... Please rephrase :=)");
                }
                break;

            case "search_word_translation":
                if (jsonObj.entities.length === 1)
                {
                    researchedWord = jsonObj.entities[0].entity;
                    this._sparql.querySparqlAllTranslations(researchedWord);
                }
                if (jsonObj.entities.length > 1)
                {
                    for (let i = 0; i < jsonObj.entities.length; i++)
                    {
                        if (jsonObj.entities[i].type === "word")
                        {
                            researchedWord = jsonObj.entities[i].entity;
                        }
                    }
                    let languages = [];
                    let j = 0;
                    for (let i = 0; i < jsonObj.entities.length; i++)
                    {
                        if (jsonObj.entities[i].type === "language")
                        {
                            languages[j] = jsonObj.entities[i].entity;
                            j++;
                        }
                    }
                    this._sparql.querySparqlTranslations(researchedWord, languages);
                }
                break;

            case 'search_word_fields':
                researchedWord = jsonObj.entities[0].entity;

                this._sparql.querySparqlSubject(researchedWord);
                break;

            case 'search_word_synonyms':
                researchedWord = jsonObj.entities[0].entity;
                this._sparql.querySparqlSubject(researchedWord);
                break;
        }
    }

    informError(log)
    {
        this._chat.appendRawMessageRobot("Something went wrong from server side, please re-phrase your question or contact an administrator :)");
    }
}