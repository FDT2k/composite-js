import {pipe,curry,chain} from './core'
import {reduce,safe_push} from './array';
import {Task} from './functor'

export const make_task_collector = _=> {
  let collector = [];

  return res => new Task((reject,resolve)=>{
    collector = safe_push(collector,res)
    resolve(collector)
  });
}

export const collect_chain_reducer = curry((collector,acc,item)=>{
  if(acc.length==0){
    acc.push(item)
  }else{
    acc.push(chain(item))
  }
  acc.push(chain(collector))

  return acc;
})

// a -> Function -> List -> a
//export const reduce = curry((initial_value,fn,array )=> array.reduce(fn,initial_value))


export const collect_chain = (collector)=>(...args)=>pipe(...reduce([],collect_chain_reducer(collector),args))
