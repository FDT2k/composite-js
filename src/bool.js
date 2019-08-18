import {curry,compose,maybe,identity} from './core'
import {Maybe} from './functor'

// STRING => BOOL
export const empty = string=> string.length==0;
// BOOL => BOOL
export const not = x => !x

export const notEmpty = compose(not,empty)

// very small either, no way to know if there was an error
/*
  if(cond is met, return right else return left)
*/
export const _either = curry( (cond,left,right,val )=>{
  let _right = right(val);
  return cond(_right) ? _right : left(val);
})

export const is_type_object = o => typeof o ==='object'
export const is_type_string = o => typeof o ==='string'
export const is_type_function = o => typeof o ==='function'
export const is_type_number = o => typeof o ==='number'

// default a value to something if null || undefined -> cf. Maybe
export const defaultTo = val => compose(maybe(val,identity),Maybe.of)
