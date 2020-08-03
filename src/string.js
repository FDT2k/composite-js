import {curry,flip,compose,map,identity} from './core.js'
// replace :: Regex -> String -> String -> String
export const replace = curry((re, rpl, str) => str.replace(re, rpl));

// test :: RegEx -> String -> Boolean
export const test = curry((re, str) => re.test(str));

// match :: Regex -> String -> List
export const match = curry((re, str) => str.match(re));
export const regex = str => new RegExp(str)


// concat :: String -> String
export const concat = curry((a, b) => a.concat(b));

// append :: String -> String
export const append = flip(concat);

// length :: String -> Number
export const length = str=> str.length

export const split = curry((sep,str)=> str.split(sep))

export const lcase = string => string.toLowerCase();
export const ucase = string => string.toUpperCase();

export const repeat = curry((times,string) => string.repeat(times));

export const trim = string => string.trim();


export const lcfirst = string => string.charAt(0).toLowerCase() + string.slice(1)
export const ucfirst = string => string.charAt(0).toUpperCase() + string.slice(1)

export const isCapitalLetter= char => char.charCodeAt(0) >= 65 && char.charCodeAt(0) <=90
export const isLowerCaseLetter = char => char.charCodeAt(0) >= 97 && char.charCodeAt(0) <=122

export * from 'Effect/CLIColorSet'