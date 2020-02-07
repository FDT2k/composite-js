import {curry,compose} from '../core'
import {defaultTo,isStrictlyEqual,isStrictlyNotEqual} from '../bool'


import {findIndex as _findIndex,filter} from './safe'

export const findIndex = _findIndex;
// value => List => Number
export const findIndexEqual = compose(_findIndex,isStrictlyEqual)
// value => List => Number
export const findIndexNotEqual = compose(_findIndex,isStrictlyNotEqual)
// value => List => List
export const filterNotEqual = compose(filter,isStrictlyNotEqual)
// value => List => List
export const filterEqual = compose(filter,isStrictlyEqual)
