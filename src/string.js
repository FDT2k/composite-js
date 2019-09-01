import {curry,flip} from './core'

// replace :: Regex -> String -> String -> String
export const replace = curry((re, rpl, str) => str.replace(re, rpl));

// match :: RegEx -> String -> Boolean
export const match = curry((re, str) => re.test(str));

// concat :: String -> String
export const concat = curry((a, b) => a.concat(b));

// append :: String -> String
export const append = flip(concat);

// length :: String -> Number
export const length = str=> str.length

export const split = curry((sep,str)=> str.split(sep))
