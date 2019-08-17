import {curry,flip,curryX} from './core'
import {defaultTo} from './bool'
import {reduce} from './array'



export const assign2 = curry((x,y)=> Object.assign({},x,y))

export const _merge = curry( (a,b) => (assign2(a,b)))
export const merge = _merge

//makeMerge :: Number -> (Number, ([a]-> b)) -> ([a] -> b)
export const makeMerge = (arity) =>{
  return curryX(arity,(...args)=>{
    return reduce({},(a,b)=> merge(a,b),args)
  });
}

export const mergeAll = list => reduce({},assign2,list)





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
