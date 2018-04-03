class curr_chat
{
    constructor()
    {
        this._sent = '<li class="curr-bot-sent">';
        this._reply = '<li class="curr-bot-replies">';
        this._currencies = JSON.parse(new currencies().getCurrenciesString());
    }


    /**
     * Constructs the response of the user according to what he entered in input fields
     * @returns {string}
     */
    constructUserResponse()
    {
        let currencyFrom = ($("#countries  option:selected").val()).substr(0, 3);
        let symbolFrom = "";
        let currencyFromTotalName = "";
        let currencyTo = ($("#countries2  option:selected").val()).substr(0, 3);
        let symbolTo = "";
        let currencyToTotalName = "";
        let amount = $("#curr-bot-amount").val();
        if (this._currencies[currencyFrom] != null)
        {
            symbolFrom = this._currencies[currencyFrom].symbol_native;
            currencyFromTotalName = this._currencies[currencyFrom].name;
        }
        if (this._currencies[currencyTo] != null)
        {
            symbolTo = this._currencies[currencyTo].symbol_native;
            currencyToTotalName = this._currencies[currencyTo].name;
        }
        let message = "Convert " + amount + " " + currencyFrom;

        if (currencyFromTotalName != "")
        {
            message += " - " + currencyFromTotalName;
        }
        if (symbolFrom != "")
        {
            message += " (" + symbolFrom + ") ";
        }

        message += " TO " + currencyTo ;

        if (currencyToTotalName != "")
        {
            message += " - " + currencyToTotalName;
        }
        if (symbolTo != "")
        {
            message += " (" + symbolTo + ")";
        }
        return message;
    }

    /**
     * allows to append new messagesin the <li> of the user
     * @returns {boolean}
     */
    appendNewMessageUser()
    {
        if ($("#curr-bot-amount").val() == "")
        {
            return false;
        }

        let message = this.constructUserResponse();

        $('<li class="curr-bot-replies"><p>' + message + '</p></li>').appendTo($('.curr-bot-messages ul'));

    }

    /**
     * Allow to append new messages in the chat for the robot
     * @param message
     */
    appendNewMessageRobot(message)
    {
        $(message).appendTo($('.curr-bot-messages ul'));
    }

    /**
     * Allow to append a new message with a given string
     * @param message
     */
    appendRawMessageRobot(message)
    {
        $(this._sent + '<img src="img/logos/chatbot.png" alt ="" /><p>' + message + '</p></li>').appendTo($('.curr-bot-messages ul'));
        this.scrollToBottom();
    }

    /**
     * scrolls to the far bottom of the chat window
     */
    scrollToBottom()
    {
        $('.curr-bot-messages').animate(
        {
            scrollTop: $('.curr-bot-messages')[0].scrollHeight
        });
    }
}