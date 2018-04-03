class api_wb_request
{
    constructor()
    {
        this._parser = new api_wb_result_parser();
    }

    /**
     * starting req
     * @returns {boolean}
     */
    startRequest()
    {
        // retrieving the question of the user
        let userQuestion = $('#weather-bot-txt-search').val();
        if (userQuestion === "")
        {
            return false;
        }
        // API link
        let queryURL = //*****
        queryURL += userQuestion;

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
        $('#weather-bot-txt-search').val("");
    }

}