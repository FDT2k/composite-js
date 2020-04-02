import {spreadFilterByKey,key,objectReduce} from 'Object'
import {enlist} from 'object'
import {replace,concat,append,test} from 'string'
import {compose,curry} from 'core'
import { lcfirst } from '../string'

import {trace} from 'debug'

export const regex = str => new RegExp(str)

export const updateProp = curry((prop,obj,value)=> updateObject(obj, {[prop]: value}))

export const beginWith = compose(test,regex,concat('^'))
export const contains = compose(test,regex,concat(''))
export const endWith = compose(test,regex,append('$'))
export const equals = compose(test,regex,append('$'),concat('^'))


export const spreadObject = spreadFilterByKey

export const spreadObjectBeginWith =  curry( (str,obj) => spreadFilterByKey(beginWith(str)) (obj))
export const spreadObjectContaining =  curry( (str,obj) => spreadFilterByKey(contains(str)) (obj))
export const spreadObjectEndingWith =  curry( (str,obj) => spreadFilterByKey(endWith(str)) (obj))



export const transformReplace  = (re,repl) =>  replace(re,repl)
export const transformLowSnake  =  lcfirst

export const replaceKeyReducer = transform => (acc,item)=>{
    
    acc[transform(key(item))] = item[key(item)]

    return acc
  }





// Fn -> List -> Object
export const transformProps = transform => objectReduce(replaceKeyReducer(transform))

// Fn ->  Object -> Object
export const transformKeys = transform => compose(transformProps(transform),enlist);

// String -> String
export const forwardPropsTransformer = str => compose(transformLowSnake,transformReplace(str,''));

// String -> Object ->Object
export const forwardPropsRemovingHeader = (header,obj)=> transformKeys(forwardPropsTransformer(header))(obj)