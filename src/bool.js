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
  return cond(val) ? right(val) : left(val);
})

export const isStrictlyEqual = curry((value,item)=> value===item)
export const isStrictlyNotEqual = value => compose(not,isStrictlyEqual(value))

export const _typeof =value => typeof(value)

export const is_type = val => compose(isStrictlyEqual(val),_typeof);

export const is_type_object   = is_type('object')
export const is_type_string   = is_type('string')
export const is_type_function = is_type('function')
export const is_type_number   = is_type('number')
export const is_undefined     = is_type('undefined')
export const is_array         = o => Array.isArray(o);
// a -> Bool
export const is_type_bool = is_type('boolean')


export const is_nan = Number.isNaN

export const is_numeric =  v => not(is_nan(v)) && is_type_number(v)


export const is_type_scalar = o => is_type_string(o) || is_type_number(o)  || is_type_bool(o)


export const _eitherUndefined = _either(is_undefined)


export const _throw = x=> val=> {throw new Error(x)}

//interrupt everything
export const _eitherThrow = curry((cond,error)=> _either(cond,_throw(error),identity))

//  String -> a -> Object -> Bool
export const is_prop_strictly_equal = curry((prop,value,item)=>item[prop]==value);
export const is_prop_not_strictly_equal = curry((prop,value,item)=> compose(not,is_prop_strictly_equal(prop,value))(item) )


// default a value to something if null || undefined -> cf. Maybe
export const defaultTo = val => compose(maybe(val,identity),Maybe.of)

export const tryCatcher = curry( (catcher,tryer,arg)=> {
  try{
    return tryer(arg)
  }catch(err){
    return catcher(arg,err);
  }
})
