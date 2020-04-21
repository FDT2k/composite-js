import {curry,compose,map,identity,diverge} from 'core';
import {test} from 'string'
import {trace} from '../debug'
import {reduce,head} from 'array'
import {not} from 'bool'
import { prop , keys,ensure_object_copy, assign2, enlist} from 'object';

import {isStrictlyEqual} from 'bool'


// Object -> Scalar
// {a:b} -> a
// {a:b, c:d} -> a
export const key = compose(head,keys)

//export const objectReduce = reduce({});  //<--- never do this unless you want to keep the accumulator  forever

//  String -> a -> Object -> Bool
export const isPropStrictlyEqual = curry((_prop,value,item)=> compose (isStrictlyEqual(value),prop(_prop)) (item))

export const isPropStrictlyNotEqual = curry((prop,value,item)=> compose(not,isPropStrictlyEqual(prop,value))(item) )
// filter an object and returns key that matches

// regex -> string -> Object -> Bool
export const propMatch = curry((re,key) => compose(test(re),prop(key)));


// Object -> Object -> Object 
export const matchReducer = match => (acc,item)=> {
  //  console.log(head(keys(item)))

    if(match(key(item))){
        return assign2(acc,item)
    }
    return acc;
}
// 



export const keepMatching = match => reduce({},matchReducer(match))

export const filterByKey = match => compose(keepMatching(match),trace('x'), enlist,ensure_object_copy)


/*
  perform a match function on every item of an object and returns an array like this: 
  [matching, notmatching]

  //MatchFunction => Object => List
*/
export const makeSpreadFilterByKey =transformMatching=> transformNotMatching=> (match)=> compose( 
  diverge(
    transformMatching(match),
    transformNotMatching(compose(not,match)),
  ),
  enlist,ensure_object_copy)


/*
  perform a match function on every item of an object and returns an array like this: 
  [matching, notmatching]

  //MatchFunction => Object => List
*/
export const spreadFilterByKey = makeSpreadFilterByKey(keepMatching)(keepMatching)

