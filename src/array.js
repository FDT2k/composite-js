import {curry,divergeRightThen} from './core'
import {merge} from './object'

export const flatten = a => [].concat.apply([], a);

export const reduce = curry((initial_value,fn,array )=> {
  return array.reduce(fn,initial_value);
})

// reduce an array of subObjects to a merged object of all subObjects
export const reduceToObject= reduce ({},merge)

export const divergeRightThenReduce = divergeRightThen(reduceToObject)

/*Recursively call a Curried FN  with each array item of args
NOT FOR VARIADIC */

//spread :: fn -> [a,b,c...] -> fn(a,b,c,...)
export const spread = curry((fn,args)=>{
  return reduce(fn,(_fn,arg)=>_fn(arg),args)
})
