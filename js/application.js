class Application
{
    constructor()
    {
       let messages_wordbot = new dbp_message();
       let messages_weatherbot = new accuweather_message();
       let currencyBot = new df_request();
    }


}

/**
 * Starting the application
 */
$(window).ready( () =>
{
    let word_bot = new Application();
});