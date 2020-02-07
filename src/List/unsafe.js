import {compose,curry} from '../core'



export const joinList = curry((sep,array)=> array.join(sep))

//Function -> List -> List
export const filter = curry((fn,array) => array.filter(fn))

// a -> Function -> List -> a
export const reduce = curry((initial_value,fn,array )=> array.reduce(fn,initial_value))
// FN -> List -> List
export const sort = curry((fn,list) => list.sort(fn))

export const findIndex = curry((fn,array) =>  array.findIndex(fn))
