import {curry} from '../core'

// valueEnhancer -> a -> a -> Number
export const sorterAscending = curry((fn,a,b)=> {
  const aa = fn(a);
  const bb = fn(b);
  return ((aa < bb) ? -1 : ((aa > bb) ? 1 : 0));
});

// reverse the parameter gives us the reverse result
export const sorterDescending = curry((fn,a,b)=> sorterAscending(fn,b,a))
