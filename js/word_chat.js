class chat
{
    constructor()
    {
        this._sent = '<li class="word-bot-sent">';
        this._reply = '<li class="word-bot-replies">';
    }

    /**
     * allows to append new messagesin the <li> of the user
     * @returns {boolean}
     */
    appendNewMessageUser()
    {
        let message = $("#word-bot-txt-search").val();
        if($.trim(message) === '')
        {
            return false;
        }
        $('<li class="word-bot-replies"><p>' + message + '</p></li>').appendTo($('.word-bot-messages ul'));
    }

    /**
     * Allow to append new messages in the chat for the robot
     * @param message
     */
    appendNewMessageRobot(message)
    {
        $(message).appendTo($('.word-bot-messages ul'));
        this.scrollToBottom();
    }

    /**
     * Allow to append a new message with a given string
     * @param message
     */
    appendRawMessageRobot(message)
    {
        $(this._sent + '<img src="img/logos/chatbot.png" alt ="" /><p>' + message + '</p></li>').appendTo($('.word-bot-messages ul'));
        this.scrollToBottom();
    }

    /**
     * scrolls to the far bottom of the chat window
     */
    scrollToBottom()
    {
        $('.word-bot-messages').animate(
        {
            scrollTop: $('.word-bot-messages')[0].scrollHeight
        });
    }

}