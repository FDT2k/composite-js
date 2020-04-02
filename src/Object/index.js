import {curry,compose,map,identity,diverge} from 'core';
import {test} from 'string'
import {trace} from '../debug'
import {reduce,head} from 'array'
import {not} from 'bool'
import { prop , keys, assign2, enlist} from 'object';

import {isStrictlyEqual} from 'bool'


// Object -> Scalar
// {a:b} -> a
// {a:b, c:d} -> a
export const key = compose(head,keys)

export const objectReduce = reduce({});

//  String -> a -> Object -> Bool
export const isPropStrictlyEqual = curry((_prop,value,item)=> compose (isStrictlyEqual(value),prop(_prop)) (item))

export const isPropStrictlyNotEqual = curry((prop,value,item)=> compose(not,isPropStrictlyEqual(prop,value))(item) )
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



export const keepMatching = match => objectReduce(matchReducer(match))

export const filterByKey = match => compose(keepMatching(match), enlist)

export const spreadFilterByKey = match => compose( 
  
  diverge(
      keepMatching(match),
      keepMatching(compose(not,match)),
  ),
  
  enlist)