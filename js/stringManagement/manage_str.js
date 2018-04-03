class manage_str
{
    constructor()
    {

    }


    /**
     * Function replacing occurences of a given substring for a string
     * @param str : the string in which we want to replace a substring
     * @param find : the substring to replace
     * @param replace : the string that will replace the occurences of the parameter "find"
     */
    replaceAll(str, find, replace)
    {
        return str.replace(new RegExp(find, 'g'), replace);
    }


    /**
     * Returns a given string with the first letter capitalized
     * (we first unify the string (lowercase) so we won't have SPARQL problems)
     * @param string
     * @returns {string}
     */
    capitalizeFirstLetter(string)
    {
        let str = string.toLowerCase();
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    /**
     * Function returning a ISO 639-1 code for the language (necessary to filter dpbedia results)
     */
    languageStrToLanguageTag(language)
    {
        let lang = this.capitalizeFirstLetter(language);
        switch(lang)
        {
            case "German":
                return "de";
                break;
            case "English":
                return "en";
                break;
            case "Japanese":
                return "ja";
                break;
            case "Arabian":
                return "ar";
                break;
            case "Spanish":
                return "es";
                break;
            case "French":
                return "fr";
                break;
            case "Italian":
                return "it";
                break;
            case "Dutch":
                return "nl";
                break;
            case "Polish":
                return "pl";
                break;
            case "Portuguese":
                return "pt";
                break;
            case "Russian":
                return "ru";
                break;
            case "Chinese":
                return "zh";
                break;
        }
    }

    /**
     * Opposite of "languageStrToLanguageTag(language)" : Function returning a litteral language with a given iso code.
     */
    LanguageTagToLanguageStr(tag)
    {
        switch(tag)
        {
            case "de":
                return "German";
                break;
            case "en":
                return "English";
                break;
            case "ja":
                return "Japanese";
                break;
            case "ar":
                return "Arabian";
                break;
            case "es":
                return "Spanish";
                break;
            case "fr":
                return "French";
                break;
            case "it":
                return "Italian";
                break;
            case "nl":
                return "Dutch";
                break;
            case "pl":
                return "Polish";
                break;
            case "pt":
                return "Portuguese";
                break;
            case "ru":
                return "Russian";
                break;
            case "zh":
                return "Chinese";
                break;
        }
    }
}