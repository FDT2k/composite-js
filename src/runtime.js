import {curry} from 'core'

export const call = curry((args,fn)=> fn(args))
export const propCall = p => prop(p)(obj)
