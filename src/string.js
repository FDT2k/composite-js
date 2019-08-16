import {curry,flip} from './core'

export const replace = curry((re, rpl, str) => str.replace(re, rpl));

export const concat = curry((a, b) => a.concat(b));

export const append = flip(concat);
