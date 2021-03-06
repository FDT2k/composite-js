import {curry,compose,identity,maybe,divergeRightThen,map} from './core'
import {merge,as_prop,keys,mergeAll,prop} from './object'
import {Maybe} from './functor'
import {defaultTo,isStrictlyEqual,isStrictlyNotEqual} from './bool'
import {trace} from './debug'
import {lcase} from './string'
// flatten :: [a,[a]...] -> [a,a...]
export const flatten = a => [].concat.apply([], a);

export const joinList = curry((sep,array)=> array.join(sep))

export const filter = curry((fn,array) => array.filter(fn))

export const reduce = curry((initial_value,fn,array )=> array.reduce(fn,initial_value))

export const findIndex = curry((fn,array) =>  array.findIndex(fn))

export const findIndexEqual = compose(findIndex,isStrictlyEqual)
export const findIndexNotEqual = compose(findIndex,isStrictlyNotEqual)

export const filterNotEqual = compose(filter,isStrictlyNotEqual)
export const filterEqual = compose(filter,isStrictlyEqual)


// reduce an array of subObjects to a merged object of all subObjects
export const reduceToObject= reduce ({},merge)

export const divergeRightThenReduce = divergeRightThen(reduceToObject)

/*Recursively call a Curried FN  with each array item of args */

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
export const slice = curry((x,a)=> a.slice(x));
export const reverse = a => slice(0,a).reverse()


export const safeTail = defaultTo([])(tail)
export const safeHead = defaultTo(null)(head)

// ReduceListToObject:: ObjectReducer => key => Object => Object
//export const reduceListToObject = objectReducer => key => c.compose(as_prop(key),c.reduce({},objectReducer))

export const reduceListByKey = key => reduce({},groupListByKey(key))

//shuffle [a] -> [a]
export const shuffle = (arr) => {
  let res = [...arr]

  let ctr = res.length;
  let temp;
  let index;
  while (ctr > 0) {
      index = Math.floor(Math.random() * ctr);
      ctr--;
      temp = res[ctr];
      res[ctr] = res[index];
      res[index] = temp;
  }
  return res;
}

// reduceListByKey :: [a] -> [{a,b,c}] -> {a:{a,b}}
export const reduceListByKeys = curry( (_keys,list) =>{
  if(_keys.length==0)
    return list;

  let h = head(_keys)
  let rest = safeTail(_keys)
  let res = reduceListByKey(h)(list);

  for(let key in res){
    res[key]=reduceListByKeys(rest)(res[key])
  }

  return res;
})


export const groupByKey = (key)=> curry((result,item)=>{
  result[item[key]]=item;
  return result;
})


export const sort = curry((fn,array) => array.sort(fn))



export const _sortAsc = curry((fn,a,b)=> {
  let aa = fn(a); let bb = fn(b);
  return ((aa < bb) ? -1 : ((aa > bb) ? 1 : 0));
});

export const _sortDesc = curry((fn,a,b)=> _sortAsc(fn,b,a))


export const _sortBy= curry((_sort,fn,array) => slice(0,array).sort(_sort(fn)))
export const sortByA= _sortBy(_sortAsc)
export const sortByD= _sortBy(_sortDesc)

export const sortBy = sortByA



export const sortAsCaseInsensitive = lcase
export const sortAsKeyCaseInsensitive = key=> compose (lcase,prop(key))
