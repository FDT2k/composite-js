import {curry,flip} from './core'

// replace :: Regex -> String -> String -> String
export const replace = curry((re, rpl, str) => str.replace(re, rpl));

// test :: RegEx -> String -> Boolean
export const test = curry((re, str) => re.test(str));

// match :: Regex -> String -> List
export const match = curry((re, str) => str.match(re));


// concat :: String -> String
export const concat = curry((a, b) => a.concat(b));

// append :: String -> String
export const append = flip(concat);

// length :: String -> Number
export const length = str=> str.length

export const split = curry((sep,str)=> str.split(sep))

export const lcase = string => string.toLowerCase();
export const ucase = string => string.toUpperCase();

export const repeat = times=> string => string.repeat(times);
