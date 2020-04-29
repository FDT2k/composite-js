import Task from './Task'

// 
const TaskFromPromiseThunk = promise => Task((reject,resolve)=>promise().then(resolve).catch(reject))
const TaskFromPromise = promise => TaskFromPromiseThunk(_=>promise)
const MakeTask = task => _ => Task(task);

export {
    Task,
    TaskFromPromiseThunk,
    TaskFromPromise,
    MakeTask
}