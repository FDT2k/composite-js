import Task from './Task'

// 
const TaskFromPromiseThunk = promise => Task((reject,resolve)=>promise().then(resolve).catch(reject))
const TaskFromPromise = promise => TaskFromPromiseThunk(_=>promise)

export {
    Task,
    TaskFromPromiseThunk,
    TaskFromPromise
}