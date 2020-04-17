/**
 * @description Utility for building Babel config's test methods.
 * @param {Array<RegExp>} regExpArray - RegExp array to be used.
 * @returns {function(string): boolean} Generated test method.
 */
function getTestMethodUtility(regExpArray) {
    return function test(filename) {
        return !!(
            filename && regExpArray.some((regExp) => regExp.test(filename))
        );
    };
}

export {getTestMethodUtility};
