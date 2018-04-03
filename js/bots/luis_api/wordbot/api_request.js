class api_request
{
    constructor()
    {
        this._parser = new api_result_parser();
    }


    /**
     * Starting the request
     * @returns {boolean}
     */
    startRequest()
    {
        // retrieving the question of the user
        let userQuestion = $('#word-bot-txt-search').val();
        if (userQuestion === "")
        {
            return false;
        }
        // API link
        let queryURL = // ******
        queryURL += userQuestion;
        console.log(queryURL);
        console.log(userQuestion);
        let that = this;

        $.ajax
        ({
            dataType: "json",
            url: queryURL,
            success: (response) =>
            {
                that._parser.parse(response);
            },
            error: (log) =>
            {
                that._parser.informError(log);
            },
        });

        // erasing input
        $('#word-bot-txt-search').val("");
    }

}