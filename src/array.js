import {curry,compose,identity,maybe,divergeRightThen} from './core'
import {merge,as_prop} from './object'
import {Maybe} from './functor'
import {defaultTo} from './bool'
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

// apply result of fn on the group
// ObjectReducer
// groupListByKey :: Object -> item -> Object
export const groupListByKey = (key)=> curry((result,item)=>{
  if(typeof(result[item[key]]) === 'undefined')
    result[item[key]]=[];
  result[item[key]].push(item);
  return result
})


export const tail = arr=> arr.slice(1);
export const head = arr=> arr[0];

export const safeTail = defaultTo([])(tail)
export const safeHead = defaultTo(null)(head)

// ReduceListToObject:: ObjectReducer => key => Object => Object
//export const reduceListToObject = objectReducer => key => c.compose(as_prop(key),c.reduce({},objectReducer))

export const reduceListByKey = key => reduce({},groupListByKey(key))


export const reduceListByKeys = curry( (keys,list) =>{
  if(keys.length==0)
    return list;

  let h = head(keys)
  let rest = safeTail(keys)
  let res = reduceListByKey(h)(list);

  for(let key in res){
    res[key]=reduceListByKeys(rest)(res[key])
    //res = reduceListToObject(groupListByKey())
  }
  return res;
})


export const groupByKey = (key)=> curry((result,item)=>{
  result[item[key]]=item;
  return result;
})
