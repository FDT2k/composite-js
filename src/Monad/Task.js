

/*
chain(fn) {
    return new Task((reject, resolve) => this.fork(reject, x => fn(x).fork(reject, resolve)));
  }

  join() {
    return this.chain(identity);
  }
*/
import { identity } from 'core';

const map = fork => f => Task((reject, resolve) => fork(reject, a => resolve(f(a))));
const chain = fork => f => Task((reject, resolve) => fork(reject, a => f(a).fork(reject, resolve)));

const Task = fork => ({
  map: map(fork),
  chain: chain(fork),
  join: _ => chain(fork)(identity),
  fork,
})

Task.of = a => Task((_, res) => res(a))
Task.rejected = a => Task((rej, _) => rej(a))




export default Task;