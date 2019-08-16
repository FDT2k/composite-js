import {curry,flip} from './core'
import {defaultTo} from './bool'


export const merge = curry( (a,b) => ({...a,...b}))


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


/*
  String => String => Object => Object
*/
export const as_prop = curry( (key ,value ,object) =>{
  let o = {...object}
  o[key]= value;
  return o;
})

export const as_pure_prop = key => flip(as_prop(key),defaultTo([]))
