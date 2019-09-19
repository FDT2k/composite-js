import {compose,curry,flip} from './core'


export const substract = curry((a,b)=> a-b)

export const decrement = flip(substract)(1)
