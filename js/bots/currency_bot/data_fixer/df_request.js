class df_request
{
    constructor()
    {
        this._chat = new curr_chat();
        this._interfaceSetter = new set_interface();
        this.startRequest();
    }

    startRequest()
    {
        let url = 'http://data.fixer.io/api/latest?access_key=**********&format=1';
        let that = this;
        let resp = null;
        $.ajax
        ({
            dataType: "json",
            url: url,
            success: (response) =>
            {
                that._interfaceSetter.setCurrencies(response);
            },
            error: (log) =>
            {
                that.informError(log);
            },
        });
    }

    informError(log)
    {
        this._chat.appendRawMessageRobot("Something went wrong from server side, please re-phrase your question or contact an administrator :)");
    }
}