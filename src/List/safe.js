import {curry} from '../core'

import * as __UNSAFE__ from './unsafe'


// Number -> List -> List
// 
export const slice = curry((x,a)=> a.slice(x));

// List -> List
export const ensureCopy = list => slice(0,list)

// Function -> List -> List
export const findIndex = curry((fn,array)=> __UNSAFE__.findIndex(fn,ensureCopy(array)))

// Function -> List -> List
export const filter = curry((fn,array)=> __UNSAFE__.filter(fn,ensureCopy(array)))
