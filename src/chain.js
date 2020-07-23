import {compose,pipe,curry,chain,map}   from 'core'
import {reduce,safe_push}               from 'array';
import {trace}                          from 'debug';
import {Task}                           from 'Monad'
import {as_prop}                        from 'object'
import { taskCreator } from './Minux';
/*
  The purpose of this is to collect output of chained tasks

  TaskCreator =  Function -> Task

*/

/*
  makeCollector :: Nothing -> Function -> Task
  return a <TaskCreator> that accumulate its argument in a <List> and resolves it
*/
export const make_task_collector = _=> {
  let collector = [];
  return res =>  Task((reject,resolve)=>{
    collector = safe_push(collector,res)
    resolve(collector)
  });
}

export const make_object_task_collector = _=> {
  let collector = {};
  return res =>  Task((reject,resolve)=>{
    collector = {
      ...collector,
      ...res
    }
    resolve(collector)
  });
}


// identity task is the same as identity but injected in a <Task>
// when forked, returns the same value
export const makeIdentityTask = _=> {
  return  Task((reject,resolve)=>{
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
export const useTaskCollector = compose(collect_chain,make_task_collector)
export const useTaskCollectorAsObject = compose(collect_chain,make_object_task_collector)



/*
  creates a full task chain helper
*/
export const useTaskChainCollection = (...initial_tasks)=>{
  if(initial_tasks.length ===0)
    throw new Error('you have to provide at least 1 initial TaskCreator (Function that returns a Task)')

  const make_chain = useTaskCollector();

  const run =  make_chain(...initial_tasks)
  return {
    extend: (...tasks) => (a,b) => pipe(run,chain(make_chain(...tasks)))().fork(a,b),
    run: (a,b)=>run().fork(a,b),
    tasks:initial_tasks
  }
}




export const ChainableTaskCreator = (chain_maker,_fork) => (...tasksCreators) => {
  const  make_chain = chain_maker || useTaskCollector();
  const fork = typeof _fork ==='undefined' ?  make_chain(...tasksCreators) : pipe(_fork,chain(make_chain(...tasksCreators)))

  return {
    chain : (...tasks) => ChainableTaskCreator(make_chain,fork)(...tasks),
    fork  : fork().fork,
  }
}


export const TaskChainList = (...tasksCreators)=> ChainableTaskCreator()(...tasksCreators);

export const TaskChainObject = (...tasksCreators)=> ChainableTaskCreator(useTaskCollectorAsObject())(...tasksCreators);

export const namedTask = (key,task)=> pipe(task,map(as_prop(key)))