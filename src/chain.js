import {pipe,curry,chain,map}   from './core'
import {reduce,safe_push}       from './array';
import {trace}                  from './debug';
import {Task}                   from './functor'


/*
  return a <Function> which create a <Task> that accumulate its argument when forked in a <List> and resolve the new <List>
*/
export const make_task_collector = _=> {
  let collector = [];
  return res => new Task((reject,resolve)=>{
    collector = safe_push(collector,res)
    resolve(collector)
  });
}


// identity task is the same as identity but injected in a <Task>
// when forked, returns the same value
export const makeIdentityTask = _=> {
  return new Task((reject,resolve)=>{
    resolve(_)
  })
}


/*
  expand a <List> of <Tasks> to add a <TaskCollector> after each one of them
*/
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

  for a given <List> of <Task>; Chain them and accumulate the results in an array.
  returns <Task>
*/
export const collect_chain = (collector)=>(...args)=> pipe(makeIdentityTask,...reduce([],collect_chain_reducer(collector),args))

/*
  short hand to create a Task collector
  return a function that chain and accumulate results
*/
export const useTaskCollector = ()=>{
  let collector = make_task_collector();
  return collect_chain(collector);

}


/*
  creates a full task chain helper
*/
export const useTaskChainCollection = (...initial_tasks)=>{
  if(initial_tasks.length ===0)
    throw new Error('you have to provide at least 1 initial task')

  const make_chain = useTaskCollector();

  const run =  make_chain(...initial_tasks)
  return {
    extend: (...tasks) => (a,b) => pipe(run,chain,make_chain(...tasks))().fork(a,b),
    run: (a,b)=>run().fork(a,b),
    tasks:initial_tasks
  }
}
