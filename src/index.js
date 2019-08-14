export * from './experimental'

// compose :: ((a -> b), (b -> c),  ..., (y -> z)) -> a -> z
export const compose=(...funcs) =>{
  if (funcs.length === 0) {
    return arg => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}

export const pipe = (...funcs) =>{
  if(funcs.length ===0){
    return arg => arg
  }

  if(funcs.length ===1){
    return funcs[0]
  }

  return funcs.reduce((a, b) => (...args) => b(a(...args)))
};

export const merge = a => b => ({...a,...b})
export const identity = x => x;
export const callee = x => x();

export function make_curry(arity){
  return function $curry(...args){
    if (args.length < arity) {
      return $curry.bind(null, ...args);
    }
    return fn.call(null, ...args);
  }
}

// curry :: ((a, b, ...) -> c) -> a -> b -> ... -> c
export const curry = (fn) => {
  const arity = fn.length;
  return function $curry(...args) {
    if (args.length < arity) {
      return $curry.bind(null, ...args);
    }
    return fn.call(null, ...args);
  };
}

//create a curry with an arity from another func
export const curryN = (fn,callFn) => {
  const arity = fn.length;
  return function $curry(...args) {
    if (args.length < arity) {
      return $curry.bind(null, ...args);
    }
    return callFn.call(null, ...args);
  };
}

// trace:: String -> a -> a
export const trace = curry((tag,value) => {
  console.log(tag,value);
  return value;
})

export const supertrace = curry((prefix ,tag,value) => trace(prefix+ ' '+tag,value))

export const flip = curry((fn, a, b) => fn(b, a));

export const flatten = a => [].concat.apply([], a);


// map :: Functor f => (a -> b) -> f a -> f b
export const map = curry((fn, f) => f.map(fn));

export const prop = prop => obj => obj[prop]


// maybe :: b -> (a -> b) -> Maybe a -> b
export const maybe = curry((value, fn, functor) => {
  if (functor.isNothing) {
    return value;
  }
  return fn(functor.$value);
});

const inspect = console.log

export class IO {
  static of(x) {
    return new IO(() => x);
  }

  constructor(fn) {
    this.$value = fn;
  }

  map(fn) {
    return new IO(compose(fn, this.$value));
  }

  inspect() {
    return `IO(${inspect(this.$value)})`;
  }
}

/*holds execution if inspector enabled*/

export const debug_trace = (x)=>{let data = x.getAll();debugger;  return x}
