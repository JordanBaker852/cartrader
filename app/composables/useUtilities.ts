export const useUtilities = () => {

    const capitaliseFirstLetter = (word: string): string => {
        if (!word) {
            return "";
        }

        return word.charAt(0).toUpperCase() + word.slice(1);
    };

    const isLastCharacterAnS = (word: string): boolean => {
        return word.charAt(word.length - 1) == "s";
    };

    const replaceHyphensWithSpaces = (word: string): string => {
        return word.replace("-", " ");
    };

    const convertStringToUrlSlug = (word: string): string => {
        return word.toLowerCase().replace(/\s+/g, '-');
    };

    return {
        capitaliseFirstLetter,
        isLastCharacterAnS,
        replaceHyphensWithSpaces,
        convertStringToUrlSlug
    };
};