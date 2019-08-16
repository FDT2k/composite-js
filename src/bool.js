import {curry,compose,maybe,identity} from './core'
import {Maybe} from './functor'

// STRING => BOOL
export const empty = string=> string.length==0;
// BOOL => BOOL
export const not = x => !x

export const notEmpty = compose(not,empty)

// very small either, no way to know if there was an error
export const _either = curry( (cond,left,right,val )=>{
  let _right = right(val);
  return cond(_right) ? _right : left(val);
})

export const type_object = o => typeof o ==='object'


export const defaultTo = val => compose(maybe(val,identity),Maybe.of)
