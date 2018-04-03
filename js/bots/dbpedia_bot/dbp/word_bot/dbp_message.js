class dbp_message
{
    constructor()
    {
        this._requests = new api_request();
        this._chat = new chat();

        let that = this;
        $('#word-bot-ok-btn').on("click", (event) =>
        {
            that._chat.appendNewMessageUser();
            that.scrollToBottom();
            that._requests.startRequest();
        });

        $(window).on('keydown', (event) =>
        {
            if (event.which === 13)
            {
                that._chat.appendNewMessageUser();
                that.scrollToBottom();
                that._requests.startRequest();
            }
        });
    }


    scrollToBottom()
    {
        $('.word-bot-messages').animate(
        {
            scrollTop: $('.word-bot-messages')[0].scrollHeight
        });
    }
}