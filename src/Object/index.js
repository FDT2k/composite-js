import {curry,compose,map,identity,diverge} from '../core';
import {test} from '../string'
import {trace} from '../debug'
import {reduce,head} from '../array.js'
import {_either,not} from '../bool'
import { prop , keys, assign2, enlist} from '../object';

export const key = compose(head,keys)

// filter an object and returns key that matches

// regex -> string -> Object -> Bool
export const propMatch = curry((re,key) => compose(test(re),prop(key)));


// Object -> Object -> Object 
export const matchReducer = curry((match,acc,item)=> {
  //  console.log(head(keys(item)))

    if(match(key(item))){
        return assign2(acc,item)
    }
    return acc;
})
// 

export const keepMatching = match => reduce({},matchReducer(match))

export const filterByKey = match => compose(keepMatching(match), enlist)

export const spreadFilterByKey = match => compose( 
  
  diverge(
      keepMatching(match),
      keepMatching(compose(not,match)),
  ),
  
  enlist)