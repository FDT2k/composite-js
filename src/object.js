import {pipe,map,curry,flip} from './core'
import {defaultTo} from './bool'


export const assign2 = curry((x,y)=> Object.assign({},x,y))
export const _merge = curry( (a,b) => (assign2(a,b)))
export const merge = _merge



export const prop = curry((prop,obj) => obj[prop])

export const keys = o => Object.keys(o)


// String => Object => Object
export const omit_key = curry( (_omit,obj) => {
  let o = {};
  Object.keys(obj).map(key => {
    if(key !==_omit){
      o[key] = obj[key]
    }
  })
  return o;


})

export const ensure_object_copy = assign2({})

/*
  String -> String -> Object -> Object
*/
export const as_object_prop = curry( (key ,value ,object) =>{
  let o = {...object}
  o[key]= value;
  return o;
})

//  a -> b -> Object

export const as_prop = curry((key,value)=> flip(as_object_prop(key),defaultTo({}),value))


/*
 Spec
  for a given object for which values are function  returns a new object with

  {
    x: fn(a,b),
    y: fn(a,b,c),
  }

  spec(obj,a)
  => {
    x: fn(a,b)(a)
    y: fn(a,b,c)(a)
  }

*/

export const spec = curry((obj,arg)=> pipe(
  keys,
  map(x=>as_prop(x,obj[x](arg))),
  mergeAll
)(obj))


//Object -> List
export const enlist = curry((obj)=> pipe(
  keys,
  map(x => as_prop(x,obj[x]))
)(obj))