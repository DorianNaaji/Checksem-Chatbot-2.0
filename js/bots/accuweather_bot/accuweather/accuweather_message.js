class accuweather_message
{
    constructor()
    {

        this._chat = new weather_chat();
        this._requests = new api_wb_request();

        let that = this;
        $("#weather-bot-btn-ok").on("click", (event) =>
        {
            that._chat.appendNewMessageUser();
            that.scrollToBottom();
            that._requests.startRequest();
            //request

        });

        $(window).on('keydown', (event) =>
        {
            if (event.which === 13)
            {
                that._chat.appendNewMessageUser();
                that.scrollToBottom();
                that._requests.startRequest();
                //request
            }
        });
    }

    scrollToBottom()
    {
        $('.weather-bot-messages').animate(
            {
                scrollTop: $('.weather-bot-messages')[0].scrollHeight
            });
    }
}