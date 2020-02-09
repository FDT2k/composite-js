import {curry,flip,curryX} from './core'
import {defaultTo} from './bool'
import {reduce} from './List'



export const assign2 = curry((x,y)=> Object.assign({},x,y))
export const _merge = curry( (a,b) => (assign2(a,b)))
export const merge = _merge

//makeMerge :: Number -> (Number, ([a]-> b)) -> ([a] -> b)
export const makeMerge = (arity) =>{
  return curryX(arity,(...args)=>{
    return reduce({},(a,b)=> merge(a,b),args)
  });
}

// mergeAll :: [{a},{b},{c}]-> {a,b,c,d}
export const mergeAll = list => reduce({},assign2,list)

// a -> Object(a:x) -> x
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
  String -> String -> Object -> Object
*/
export const as_object_prop = curry( (key ,value ,object) =>{
  let o = {...object}
  o[key]= value;
  return o;
})

//  a -> b -> Object(a:b)

//export const as_prop = curry((key,value)=> flip(as_object_prop(key),defaultTo({}),value))
export const objOf = curry((k,v)=>({[k]:v}))
export const callProp = curry((prop,obj,arg)=> obj[prop](arg))

export const spec =  curry( (o, x)=> map() )
