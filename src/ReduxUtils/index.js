import {curry} from 'core'
import {filter} from 'array'
import {assign2} from 'object'
import {not,isStrictlyNotEqual} from 'bool'
import {either} from 'conditional'
import {map,identity} from 'core'
import {filterByKey,isPropStrictlyEqual,isPropStrictlyNotEqual} from 'Object'

export const updateObject = assign2


// ListUtils
export const delFromList = curry ( (list,val)=> filter(isStrictlyNotEqual(val),list))

export const delFromListByProp = curry ( (prop,list,val)=> filter(isPropStrictlyNotEqual(prop,val),list))
export const delFromListByPropId = delFromListByProp('id')


export const addToList = curry((list,item)=> [...list,item]);
export const getFromListByProp = curry((prop,list,val)=> filter(isPropStrictlyEqual(prop,val),list))


// String-> List -> ?  -> List
//add an item into array which must be unique by its prop value
export const addToListUniqByProp = curry((prop,list,item) => addToList(delFromListByProp(prop,list,item[prop]),item))
export const addToListUniq = curry( (list,val)=> add(del(list,val),val))

export const updateList = curry((cond,val,list,fn) => map(either(cond(val),identity,fn))(list))
export const updateListIfPropEqual =curry((prop,val,list,fn) => updateList(isPropStrictlyEqual(prop),val,list,fn)  )


export const delFromObjectByKey= curry((string,obj) => filterByKey(isStrictlyNotEqual(string))(obj)) ;


// String -> Object -> ? -> Object
export const updateProp = curry((prop,obj,value)=> updateObject(obj, {[prop]: value}))