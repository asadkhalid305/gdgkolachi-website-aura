import lodashTimes from 'lodash/times'

export const validationService = (function () {
    // Note: The values in 'msg' are keys for translation. Add in en.json when adding new ones.
    const patterns = {
        required: {
            msg: 'Required'
        },
        code: {
            regex: /[<>()]/,
            msg: 'CODE_CHARACTERS'
        },
        fullName: {
            regex: /^[a-z\xC0-\uFFFF ,.'-]+ [a-z\xC0-\uFFFF ,.'-]+$/i,
            msg: 'First Name and Last Name required'
        },
        name: {
            regex: /^[a-z\xC0-\uFFFF ,.'-]+$/i,
            msg: 'Valid Name required'
        },
        street: {
            regex: /^[a-zA-Z0-9 \\/#_-]+$/,
            msg: 'VALID_CHARACTERS'
        },
        email: {
            regex: /^[a-zA-Z0-9\xC0-\uFFFF!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9\xC0-\uFFFF!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9\xC0-\uFFFF](?:[a-zA-Z0-9\xC0-\uFFFF-]*[a-zA-Z0-9\xC0-\uFFFF])?\.)+[a-zA-Z0-9\xC0-\uFFFF](?:[a-zA-Z0-9\xC0-\uFFFF-]*[a-zA-Z0-9\xC0-\uFFFF])?$/,
            msg: 'Valid email address required'
        },
        phone_number: {
            regex: /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[-. \\/]?)?((?:\(?\d{1,}\)?[-. \\/]?){7,})(?:[-. \\/]?(?:#|ext\.?|extension|x)[-. \\/]?(\d+))?$/,
            msg: 'Valid phone number required'
        },
        genericTitle: {
            regex: /^[a-zA-Z0-9\xC0-\uFFFF][a-zA-Z0-9\xC0-\uFFFF '.,_()#&+-]*$/,
            msg: 'Title is not valid'
        },
        location: {
            regex: /(\w+\s?)(,\s?\w+)/,
            msg: 'Valid location format required'
        },
        password: {
            regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[-~!@#$%^&*()_+`={}|[\]\\:"<>?,./])(?=.{8,})/,
            msg: 'The password must meet the criteria'
        },
        domain: {
            regex: /^(?!:\/\/)([a-zA-Z0-9\xC0-\uFFFF-_]+\.)*[a-zA-Z0-9\xC0-\uFFFF][a-zA-Z0-9\xC0-\uFFFF-_]+\.[a-zA-Z\xC0-\uFFFF]{2,11}?$/,
            msg: 'Invalid Domain'
        },
        url: {
            regex: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9\xC0-\uFFFF]+([-.]{1}[a-z0-9\xC0-\uFFFF]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
            msg: 'Invalid Domain URL'
        },
        profileName: {
            regex: /^[A-Za-z\xC0-\uFFFF. -]+$/,
            msg: 'NAME_CHARACTERS'
        },
        nameMaxCharacter: {
            msg: 'Text can contains thirty characters only'
        },
        embeddableDomain: {
            regex: /(((?:https?:\/\/)?((?:(?:\*\.)?(?:(?:[a-z0-9]\.|[a-z0-9][a-z0-9-]*[a-z0-9]\.))+(?:[a-z0-9]|[a-z0-9][a-z0-9-]*[a-z0-9])+))|((?:(?:[0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}(?:[0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])))(:(?:[0-9]+|\*))?)/i,
            msg: 'Domain value specified is not valid'
        },
        number: {
            msg: 'Only numbers are allowed'
        },
        positive: {
            msg: 'Only positive numbers are allowed'
        },
        timeInterval: {
            msg: 'TIME_VALID'
        },
        threadCount: {
            regex: /^[1-9][0-9]?$|^100$/,
            msg: 'Thread count value should be between 1 and 100'
        },
        ip: {
            regex: /(^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*(?:\.[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*)*$)|(^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$)/,
            msg: 'Valid DNS or IPv4 address required'
        },
        regex: {
            msg: 'Not a valid regex'
        },
        alphaNumeric: {
            regex: /^[a-zA-Z0-9\xC0-\uFFFF]*$/,
            msg: 'Alphanumeric values are allowed only'
        },
        city: {
            regex: /^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/,
            msg: 'Valid city format required'
        },
        range: {
            msg: 'MUST BE INBETWEEN {min} - {max}'
        },
        integer: {
            regex: /^\d+$/,
            msg: 'Input must be integer'
        },
        naturalNumber: {
            msg: 'Only natural numbers are allowed'
        },
        positiveIntegerExcludingZero: {
            regex: /^[1-9]\d*$/,
            msg: 'Input must be integer greater than 1'
        },
        port: {
            regex: /^(|null|[1-5](\d){4}|[1-9](\d){0,3}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$/,
            msg: 'Port number should be between 1 and 65535'
        }
    }

    //a list of all the rules which can have a range
    const requiresRange = {
        range: true
    }

    var patternvalidations = {
        required: (customErrMsg, value) => !!value || (customErrMsg || patterns.required.msg),
        emptyString: (customErrMsg, value) => (!!value && !!value.trim()) || (customErrMsg || patterns.required.msg),
        fullName: (customErrMsg, value) =>
            patterns.fullName.regex.test(value) || (customErrMsg || patterns.fullName.msg),
        name: (customErrMsg, value) => patterns.name.regex.test(value) || (customErrMsg || patterns.name.msg),
        street: (customErrMsg, value) =>
            !value || patterns.street.regex.test(value) || (customErrMsg || patterns.street.msg),
        email: (customErrMsg, value) => patterns.email.regex.test(value) || (customErrMsg || patterns.email.msg),
        phone_number: (customErrMsg, value) =>
            !value || patterns.phone_number.regex.test(value) || (customErrMsg || patterns.phone_number.msg),
        domain: (customErrMsg, value) => patterns.domain.regex.test(value) || (customErrMsg || patterns.domain.msg),
        url: (customErrMsg, value) => patterns.url.regex.test(value) || (customErrMsg || patterns.url.msg),
        genericTitle: (customErrMsg, value) =>
            patterns.genericTitle.regex.test(value) || (customErrMsg || patterns.genericTitle.msg),
        location: (customErrMsg, value) =>
            !value || patterns.location.regex.test(value) || (customErrMsg || patterns.location.msg),
        password: (customErrMsg, value) =>
            patterns.password.regex.test(value) || (customErrMsg || patterns.password.msg),
        profileName: (customErrMsg, value) =>
            patterns.profileName.regex.test(value) || (customErrMsg || patterns.profileName.msg),
        nameMaxCharacter: (customErrMsg, value = '') =>
            value.length < 31 || (customErrMsg || patterns.nameMaxCharacter.msg),
        embeddableDomain: (customErrMsg, value) =>
            value.length === 0 ||
            value.split(' ').every(domain => patterns.embeddableDomain.regex.test(domain)) ||
            (customErrMsg || patterns.embeddableDomain.msg),
        number: (customErrMsg, value) => !isNaN(value) || (customErrMsg || patterns.number.msg),
        positive: (customErrMsg, value) => value > -1 || (customErrMsg || patterns.positive.msg),
        threadCount: (customErrMsg, value) =>
            patterns.threadCount.regex.test(value) || (customErrMsg || patterns.threadCount.msg),
        regex: (customErrMsg, value) => {
            try {
                new RegExp(value)
            } catch (e) {
                return customErrMsg || patterns.regex.msg
            }
            return true
        },
        alphaNumeric: (customErrMsg, value) =>
            patterns.alphaNumeric.regex.test(value) || (customErrMsg || patterns.alphaNumeric.msg),
        city: (customErrMsg, value) => patterns.city.regex.test(value) || (customErrMsg || patterns.city.msg),
        range: (customErrMsg, limit, value) => {
            return (value.length >= limit.min && value.length <= limit.max) ||
                (customErrMsg || patterns.range.msg.replace('{min}', limit.min).replace('{max}', limit.max))
        },
        integer: (customErrMsg, value) => patterns.integer.regex.test(value) || (customErrMsg || patterns.integer.msg)
    }

    /**
     * Range object is a collection of ranges for all the range accepting rules added in the rules list
     * @typedef {Object} range
     * @property {number} min - minimum
     * @property {number} max - maximum
     */

    /**
     * Example usage: getRules('email') or getRules('email', ['bad email'])
     * @param {string} rulePattern
     * @param {Array} customErrorMessages -- optional array of custom error messages.
     *                                       If one is empty then use default for that one
     * @param {Object} rangeMap -- a collection of {@link range} for all the range accepting rules provided in rulePattern
     *                             all range accepting rules are added in {@link requiresRange}
     *                             key of the map is the name of the rule for which we are adding a range
     */
    function getRules(rulePattern, customErrorMessages, rangeMap = {}) {
        let patternsList = rulePattern.split('|')
        customErrorMessages = customErrorMessages || lodashTimes(patternsList.length, () => '')
        let rulesList = []

        patternsList.forEach((pattern, index) => {
            if (pattern in patternvalidations) {
                if (requiresRange[pattern]) {
                    rulesList.push(
                        patternvalidations[pattern].bind(null, customErrorMessages[index], rangeMap || {})
                    )
                } else {
                    rulesList.push(patternvalidations[pattern].bind(null, customErrorMessages[index]))
                }
            }
        })
        return rulesList
    }

    /**
     * @typedef {Object} Rule
     * @property {RegExp} regex - pattern for the rule
     * @property {string} msg - title/message of the rule to guide user
     * @property {boolean} passed - if the password passes the rule this property is set to true
     */
    /**
     * This is a factory to produce new rules array for password. We can use this array to make password text
     * compliant with all the requirements.
     * @return {Rule[]}
     */
    function getPasswordRules() {
        return [
            {
                regex: /^(?=.*[a-z])/,
                msg: 'Lower case letter',
                passed: false
            },
            {
                regex: /(?=.*[-~!@#$%^&*()_+`={}|[\]\\:"<>?,./])/,
                msg: 'Special character',
                passed: false
            },
            {
                regex: /(?=.*[A-Z])/,
                msg: 'Upper case letter',
                passed: false
            },
            {
                regex: /(?=.*[0-9])/,
                msg: 'Number',
                passed: false
            },
            {
                regex: /(?=.{8,})/,
                msg: '8 characters long',
                passed: false
            }
        ]
    }

    return {
        getRules: getRules,
        getPasswordRules: getPasswordRules
    }
})()
