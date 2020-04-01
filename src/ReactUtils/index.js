import {spreadFilterByKey} from 'Object'
import {concat,append,test} from 'string'
import {compose,curry} from 'core'

export const regex = str => new RegExp(str)

export const beginWith = compose(test,regex,concat('^'))
export const contains = compose(test,regex,concat(''))
export const endWith = compose(test,regex,append('$'))


export const spreadObject = spreadFilterByKey

export const spreadObjectBeginWith =  curry( (str,obj) => spreadFilterByKey(beginWith(str)) (obj))
export const spreadObjectContaining =  curry( (str,obj) => spreadFilterByKey(contains(str)) (obj))
export const spreadObjectEndingWith =  curry( (str,obj) => spreadFilterByKey(endWith(str)) (obj))
