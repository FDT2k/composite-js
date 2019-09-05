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

export const callCurry = namedCurry =>  arity => fn => (...args) => {
  if (args.length < arity) {
    return namedCurry.bind(null, ...args);
  }
  return fn.call(null, ...args);
}



// curry :: ((a, b, ...) -> c) -> a -> b -> ... -> c
export const curry = (fn) => {
  const arity = fn.length;
  return function $curry(...args) {
    return callCurry($curry)(arity)(fn)(...args)
  };
}

// curry that allow empty args
export const curryNull = (fn)=>{
  const arity = fn.length;
  return (...args)=>{
    let idx = 0;
    let prevArgs = null
    let curr =  function $curryNull() {

      console.log(prevArgs,args,idx,arity)

      if(prevArgs == null ){ // never called
        if(args.length == 0)
          args = [null]
        idx += args.length
      }


      if(prevArgs != null){
        if(args.length < arity){
          args.push(null)
        }
      }


      return callCurry($curryNull)(arity)(fn)(...args)

    }
    let res = curr()
    prevArgs = args

    return res;
  }
}


/*
  Generating a N arity curry from another defined FN to be help compose variadics

  CurryCeption
*/
// curryN :: ((a, b, ...),(a, b, ...)) ->(a, b, ...) -> c) -> a -> b -> ... -> c
export const curryN = (fn,callFn) => {
  const arity = fn.length;
  return function $curryN(...args) {
    /*if (args.length < arity) {
      return $curryN.bind(null, ...args);
    }
    return callFn.call(null, ...args);*/
    return callCurry($curryN)(arity)(callFn)(...args)
  };
}

/*
  Generating a X arity curry to be help compose variadics

  CurryCeption
*/
export const curryX = (_arity,fn) => {
  const arity = _arity;
  return function $curryX(...args) {
  /*  if (args.length < arity) {
      return $curryX.bind(null, ...args);
    }
    return fn.call(null, ...args);*/
    return callCurry($curryX)(arity)(fn)(...args)
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
// diverge :: ((a->b),(a->c),...,(a->z)) => [b,c,...z]
export const diverge = (...args)=> x => args.map(arg=> arg(x))
// divergeRightThen  :: ([a]->b) -> ((a->b),(a->c),...,(a->z)) -> [a,c,...,z] -> b
export const divergeRightThen = z =>(...args) => compose (z,diverge(...args))

// divergeLeftThen  :: ([a]->b) -> ((a->b),(a->c),...,(a->z)) -> [a,c,...,z] -> b
export const divergeLeftThen = z => (...args) => pipe (diverge(...args),z)

// identity :: a -> a
export const identity = x => x;

// callee :: a -> b -> a(b)
export const callee = x => x();

// flip :: ((a,b)->c)  -> a -> b -> (b,a) -> c
// flip :: (a -> b -> c) -> b -> a -> c
export const flip = curry((fn, a, b) => fn(b, a));

// safeCall :: Functor f => (a -> c) -> b -> a b -> c
export const safeCall = a => b => a(b)

// safePropCall :: {x} -> Scalar -> (a,...,z) -> c
export const safePropCall = x => z => (...a)=>{return x[z](...a)}

// map :: fn f => (a -> b) -> f a -> f b
// map :: Functor f => (a -> b) -> f a -> f b
export const map = curry((fn, f) => f.map(fn));

// join :: Monad m => m (m a) -> m a
export const join = m => m.join();
// chain :: Monad m => (a -> m b) -> m a -> m b
export const chain = f => compose(join, map(f));

// maybe :: b -> (a -> b) -> Maybe a -> b
export const maybe = curry((value, fn, functor) => {
  if (functor.isNothing) {
    return value;
  }
  return fn(functor.$value);
});
