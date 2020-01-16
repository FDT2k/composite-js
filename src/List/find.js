import {curry,compose} from '../core'
import {defaultTo,isStrictlyEqual,isStrictlyNotEqual} from '../bool'


// Function -> List -> Number
export const findIndex = curry((fn,array) =>  array.findIndex(fn))


// value => List => Number
export const findIndexEqual = compose(findIndex,isStrictlyEqual)
// value => List => Number
export const findIndexNotEqual = compose(findIndex,isStrictlyNotEqual)
// value => List => List
export const filterNotEqual = compose(filter,isStrictlyNotEqual)
// value => List => List
export const filterEqual = compose(filter,isStrictlyEqual)
