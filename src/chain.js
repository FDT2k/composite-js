
import {reduce} from './array';


export const make_task_collector = _=> {
  let collector = [];

  return res => new C.Task((reject,resolve)=>{
    collector = safe_push(collector,res)
    resolve(collector)
  });
}

export const collect_chain_reducer = (acc,item)=>{
  if(acc.length==0){
    acc.push(item)
  }else{
    acc.push(chain(item))
  }
  acc.push(chain(collector))

  return acc;
}

// a -> Function -> List -> a
//export const reduce = curry((initial_value,fn,array )=> array.reduce(fn,initial_value))
export const collect_chain = (collector)=>(...args)=>reduce([],collect_chain_reducer,args)
