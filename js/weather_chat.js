class weather_chat
{
    constructor()
    {
        this._sent = '<li class="weather-bot-sent">';
        this._reply = '<li class="weather-bot-replies">';
    }

    /**
     * allows to append new messagesin the <li> of the user
     * @returns {boolean}
     */
    appendNewMessageUser()
    {
        let message = $("#weather-bot-txt-search").val();
        if($.trim(message) === '')
        {
            return false;
        }
        $('<li class="weather-bot-replies"><p>' + message + '</p></li>').appendTo($('.weather-bot-messages ul'));
    }

    /**
     * Allow to append new messages in the chat for the robot
     * @param message
     */
    appendNewMessageRobot(message)
    {
        $(message).appendTo($('.weather-bot-messages ul'));
    }

    /**
     * Allow to append a new message with a given string
     * @param message
     */
    appendRawMessageRobot(message)
    {
        $(this._sent + '<img src="img/logos/chatbot.png" alt ="" /><p>' + message + '</p></li>').appendTo($('.weather-bot-messages ul'));
        this.scrollToBottom();
    }

    /**
     * scrolls to the far bottom of the chat window
     */
    scrollToBottom()
    {
        $('.weather-bot-messages').animate(
        {
            scrollTop: $('.weather-bot-messages')[0].scrollHeight
        });
    }
}