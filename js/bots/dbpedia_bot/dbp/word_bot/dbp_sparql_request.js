class dbp_sparql_request
{
    /**
     *
     */
    constructor()
    {
        this._strManager = new manage_str();
        this._parser = new dbp_sparql_result_parser();
        this._chat = new chat();

        this._synonymWord = "";
    }

    /**
     *
     * @param word
     */
    querySparqlDefinition(word)
    {
        let capitalizedWord = this._strManager.capitalizeFirstLetter(word);
        let endpoint = "https://dbpedia.org/sparql?default-graph-uri=http%3A%2F%2Fdbpedia.org&";
        let query =  "PREFIX dbo: <http://dbpedia.org/ontology/> PREFIX res: <http://dbpedia.org/resource/> SELECT ?def WHERE { res:" + capitalizedWord + " dbo:abstract ?def. FILTER (lang(?def) = 'en')}";
        this.startSparqlRequest(query, endpoint, 'definition');
    }

    /**
     *
     * @param word
     */
    querySparqlSubject(word)
    {
        let capitalizedWord = this._strManager.capitalizeFirstLetter(word);
        let endpoint = "https://dbpedia.org/sparql?default-graph-uri=http%3A%2F%2Fdbpedia.org&";
        let query = "PREFIX dcterms: <http://purl.org/dc/terms/> PREFIX res: <http://dbpedia.org/resource/> SELECT ?subject WHERE { res:" + capitalizedWord + " dct:subject ?subject }";
        this._synonymWord = capitalizedWord;
        this.startSparqlRequest(query, endpoint, 'subject');

    }

    /**
     *
     * @param word
     */
    querySparqlAllTranslations(word)
    {
        let capitalizedWord = this._strManager.capitalizeFirstLetter(word);
        let endpoint = "https://dbpedia.org/sparql?default-graph-uri=http%3A%2F%2Fdbpedia.org&";
        let query = "PREFIX res: <http://dbpedia.org/resource/> PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> SELECT ?trad (lang(?trad) as ?lang) WHERE { res:" + capitalizedWord + " rdfs:label ?trad }";
        this.startSparqlRequest(query, endpoint, 'all_translations');
    }

    querySparqlTranslations(word, languages)
    {
        let languagesTag = [];
        for (let i = 0; i < languages.length; i++)
        {
            languagesTag[i] = this._strManager.languageStrToLanguageTag(languages[i]);
        }
        let capitalizedWord = this._strManager.capitalizeFirstLetter(word);
        let endpoint = "https://dbpedia.org/sparql?default-graph-uri=http%3A%2F%2Fdbpedia.org&";
        if (languagesTag.length === 1)
        {

            let query = "PREFIX res: <http://dbpedia.org/resource/> PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> SELECT ?trad (lang(?trad) as ?lang) WHERE { res:" + capitalizedWord + " rdfs:label ?trad. FILTER (lang(?trad) = '" + languagesTag[0] + "') }";
            this.startSparqlRequest(query, endpoint, 'translation');
        }
        else if (languagesTag.length > 1)
        {
            let query = "PREFIX res: <http://dbpedia.org/resource/> PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> SELECT ?trad (lang(?trad) as ?lang) WHERE { res:" + capitalizedWord + " rdfs:label ?trad. FILTER (lang(?trad) = '" + languagesTag[0] + "'";
            for (let i = 1; i < languagesTag.length; i++)
            {
                query += " || lang(?trad) = '" + languagesTag[i] + "'";
            }
            query += ") }";
            this.startSparqlRequest(query, endpoint, 'translation');
        }
    }


    /**
     *
     * @param query
     * @param endpoint
     * @param callback
     */
    startSparqlRequest(query, endpoint, callback)
    {
        var querypart = "query=" + escape(query);
        let xmlhttp = this.createXMLHttp();

        xmlhttp.open('POST', endpoint, true);
        xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xmlhttp.setRequestHeader("Accept", "application/sparql-results+json");


        xmlhttp.onreadystatechange = () =>
        {
            if(xmlhttp.readyState === 4)
            {
                if(xmlhttp.status === 200)
                {
                    let response = xmlhttp.responseText;
                    this.choseCallback(response, callback);
                }
                else
                {
                    this._chat.appendRawMessageRobot("Something went wrong from server side, please re-phrase your question or contact an administrator :)")
                }
            }
        };

        xmlhttp.send(querypart);
    }


    choseCallback(response, cb)
    {
        switch(cb)
        {
            case 'definition':
                this._parser.callbackDefinition(response);
                break;
            case 'all_translations':
                this._parser.callbackTranslation(response);
                break;
            case 'translation':
                this._parser.callbackTranslation(response);
                break;
            case 'subject':
                this._parser.callbackSubject(response, this._synonymWord);
        }
    }



    /**
     *
     * @returns {xmlhttp} an object to create HTTP calls
     */
    createXMLHttp()
    {
        var xmlhttp = null;
        if(window.XMLHttpRequest)
        {
            xmlhttp = new XMLHttpRequest();
        }
        else if (window.ActiveXObject)
        {
            // for IE6 or older
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        else
        {
            this._chat.appendRawMessageRobot("I'm sorry but your navigator is too old to use this chatbot... Please try with the latest version of your navigator ;)");
        }
        return xmlhttp;
    }
}
