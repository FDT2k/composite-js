import {pipe,curry,chain,map} from './core'
import {reduce,safe_push} from './array';
import {trace} from './debug';
import {Task} from './functor'

export const make_task_collector = _=> {
  let collector = [];

  return res => new Task((reject,resolve)=>{
    collector = safe_push(collector,res)
    resolve(collector)
  });
}

export const identity_task = _=> {
  return new Task((reject,resolve)=>{
    resolve(_)
  })
}

export const collect_chain_reducer = curry((collector,acc,item)=>{
  acc.push(chain(item))
//  acc.push(map(trace('x')))
  acc.push(chain(collector))
  return acc;
})

// Fn -> [Fn] -> Task 
/*

  pipe(
    identity,
    t1, -> 1
    collect, -> [1]
    t2, -> 2
    collect, [1,2]
    t3, -> 3
    collect, [1,2,3]
  )
*/
export const collect_chain = (collector)=>(...args)=> pipe(identity_task,...reduce([],collect_chain_reducer(collector),args))
