class set_interface
{
    constructor()
    {
        this._calculator = new calculator();
        this._chat = new curr_chat();
        this._answers = new curr_answer();
        this._currencies = JSON.parse(new currencies().getCurrenciesString());
        //console.log(this._currencies);


        this.manageFlags();
        this.manageConversion();
    }

    manageFlags()
    {
        $("#countries2").change( () =>
        {
            let selectedCurrency = $("#countries2  option:selected").val();
            let newClass = 'currency-flag currency-flag-' + selectedCurrency.toLowerCase();
            $('#converted_flag').attr('class', newClass);
        });
    }

    manageConversion()
    {
        let that = this;
        $("#curr-bot-btn-ok").on("click", (event) =>
        {
            that._chat.appendNewMessageUser();
            that.scrollToBottom();
            that._chat.appendNewMessageRobot(that._answers.answerUserInstant());
            //  let res = that._calculator.startOperations();
            //  console.log(res);
            that._chat.appendNewMessageRobot(that._answers.answerUserMoney(that._calculator.startOperations()));

        });

        $(window).on('keydown', (event) =>
        {
            if (event.which === 13)
            {
                if($("#curr-bot-amount").val() != "")
                {
                    that._chat.appendNewMessageUser();
                    that.scrollToBottom();
                    that._chat.appendNewMessageRobot(that._answers.answerUserInstant());
                    //  let res = that._calculator.startOperations();
                    //  console.log(res);
                    that._chat.appendNewMessageRobot(that._answers.answerUserMoney(that._calculator.startOperations()));
                    //request
                }
            }
        });
    }

    scrollToBottom()
    {
        $('.curr-bot-messages').animate(
        {
            scrollTop: $('.curr-bot-messages')[0].scrollHeight
        });
    }


    setCurrencies(result)
    {
        let currencies = result.rates;
        this._calculator.setApiResult(currencies);
        //console.log(currencies);


        let size = Object.keys(currencies).length;
        let currenciesNames = [];
        for(let key in currencies)
        {
            currenciesNames.push(key);
        }
        //console.log(currenciesNames);

        let symbols =  [];
        for(let key in this._currencies)
        {
            symbols.push(this._currencies[key].symbol_native);
        }
        //console.log(symbols);


        for(let i = 0; i < size; i++)
        {
            let currencyName = currenciesNames[i];
            let symbol = "";
            let currencyTotalName = "";
            if(    (currencyName != 'EUR')
                && (currencyName != 'USD')
                && (currencyName != 'CAN') )
            {
                if (this._currencies[currencyName] != null)
                {
                    symbol = this._currencies[currencyName].symbol_native;
                    currencyTotalName = this._currencies[currencyName].name;
                    currencyName += " (";
                    currencyName += symbol;
                    currencyName += ")";
                }

                $('.other-currencies').append($('<option>', {
                    text: currencyName
                })).prop('disabled','disabled').attr('fullName', currencyTotalName);


            }

            $('.other-currencies2').append($('<option>', {
                text: currencyName
            }));
        }
    }
}