import {curry,compose,maybe,identity} from './core'
import {Maybe} from './functor'

// STRING => BOOL
//export const empty = string=> string.length==0;
// BOOL => BOOL

//export const notEmpty = compose(not,empty)

export const not = x => !x


export const isStrictlyEqual = curry((value,item)=> value===item)
export const isStrictlyNotEqual = value => compose(not,isStrictlyEqual(value))

export const _typeof =value => typeof(value)

export const is_type = val => compose(isStrictlyEqual(val),_typeof);

export const is_type_object   = x => is_type('object')(x) &&  x !==null && !is_array(x)
export const is_type_string   = is_type('string')
export const is_type_function = is_type('function')
export const is_type_number   = is_type('number')
export const is_undefined     = is_type('undefined')
export const is_array         = o => Array.isArray(o);
// a -> Bool
export const is_type_bool = is_type('boolean')


//fucky number test in js can suck on this shit ..!..
export const is_nan = Number.isNaN
export const is_numeric =  v => not(is_nan(v)) && is_type_number(v)
export const is_type_scalar = o => is_type_string(o) || is_type_number(o)  || is_type_bool(o)


// default a value to something if null || undefined -> cf. Maybe
export const defaultTo = val => compose(maybe(val,identity),Maybe.of)

