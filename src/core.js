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


//create a curry with an arity
export const curryX = (_arity,fn) => {
  const arity = _arity;
  return function $curryX(...args) {
    if (args.length < arity) {
      return $curryX.bind(null, ...args);
    }
    return fn.call(null, ...args);
  };
}




/*
diverge

  call n Functions -> with 1 arity and give results in an array

  (fnA,fnB,...fnZ) => [fn(a),fn(b),fn(c),...fnZ(z)]

  The effect is to diverge from the current flow (compose or pipe) to preserve the initial argument in the chain

  example:


  //Object => String
  let fn1 = compose (uppercase,prop('key'))
  //Object => String
  let fn2 = compose (reverse,prop('another_key'))

  to use both in composition do

  let fn3 = compose(diverge(fn1,fn2));

  fn3 ( {'key':'foo', 'another_key':'bar'})
  //  ['rab','FOO']


              Object=>    fn1
          /            /      \
  Object=> ____ diverge  _ fn2  _ Array  ___ whatever

*/
export const diverge = (...args)=> x => args.map(arg=> arg(x))


export const divergeRightThen = z =>(...args) => compose (z,diverge(...args))
export const divergeLeftThen = z => (...args) => pipe (diverge(...args),z)

export const identity = x => x;

export const callee = x => x();

export const flip = curry((fn, a, b) => fn(b, a));

export const safeCall = x => z => x(z)

export const safePropCall = x => z => (...a)=>{return x[z](...a)}

// map :: fn f => (a -> b) -> f a -> f b
export const map = curry((fn, f) => f.map(fn));


// maybe :: b -> (a -> b) -> Maybe a -> b
export const maybe = curry((value, fn, functor) => {
  if (functor.isNothing) {
    return value;
  }
  return fn(functor.$value);
});
