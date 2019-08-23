
import {curry,map} from './core'

// trace:: String -> a -> a
export const trace = curry((tag,value) => {
  console.log(tag,value);
  return value;
})

export const trace_keys = curry((tag,value)=>{
  console.log(tag,Object.keys(value))
  return value;
})

export const supertrace = curry((prefix ,tag,value) => trace(prefix+ ' '+tag,value))



/*holds execution if inspector enabled*/

export const debug_trace = (x)=>{debugger;  return x}

export const inspect = console.log
