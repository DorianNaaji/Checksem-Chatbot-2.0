class calculator
{
    constructor()
    {
        this._apiResult = null;
    }

    startOperations()
    {
        let results = [];
        if ($("#curr-bot-amount").val() != "")
        {
            let amountFrom = $("#curr-bot-amount").val();
            let currencyFrom = ($("#countries  option:selected").val()).substr(0, 3);
            let currencyTo = ($("#countries2  option:selected").val()).substr(0, 3);
            results["from"] = currencyFrom;
            results["to"] = currencyTo;
            results["amountFrom"] = amountFrom;

            let rate = this._apiResult[currencyTo];
            let amountTo = amountFrom * rate;

            results["amountTo"] = amountTo;;

        }
        return results;
    }

    setApiResult(result)
    {
        this._apiResult = result;
    }



}