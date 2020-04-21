const Task =  fork => ({
    map: f => Task((reject, resolve) => fork(reject, a => resolve(f(a)))),
    chain: f => Task((reject, resolve) => fork(reject, a => f(a).fork(reject, resolve))),
    fork,
  })

Task.of = a => Task(  (_, res) => res(a)  )
Task.rejected = a => Task(  (rej,_) => rej(a) )

export default Task;