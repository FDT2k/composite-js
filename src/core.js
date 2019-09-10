/**
 * Compose several unary function into one function that is executed from right to left
 *
 * @func
 * @category Function
 * @sig ((y -> z), (x -> y), ..., (o -> p), ((a, b, ..., n) -> o)) -> ((a, b, ..., n) -> z)
 * @param {...Function} ...functions The functions to compose
 * @return {Function}
 */
export const compose=(...funcs) =>{
  if (funcs.length === 0) {
    return arg => arg
  }
  if (funcs.length === 1) {
    return funcs[0]
  }
  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}

/**
 * Compose several unary function into one function that is executed from left to right
 *
 * @func
 * @category Function
 * @sig ((y -> z), (x -> y), ..., (o -> p), ((a, b, ..., n) -> o)) -> ((a, b, ..., n) -> z)
 * @param {...Function} ...functions The functions to compose
 * @return {Function}
 */

export const pipe = (...funcs) =>{
  if(funcs.length ===0){
    return arg => arg
  }
  if(funcs.length ===1){
    return funcs[0]
  }
  return funcs.reduce((a, b) => (...args) => b(a(...args)))
};

/**
* The core of curry
*
* @func
* @category Function
* @sig Function -> Number -> Function -> ...Arguments -> Function
* @param {Function}
* @param {Integer}
* @param {Function}
* @param {...Any}
* @return {Function}

*/
const callCurry = namedCurryFunction =>  arity => fn => (...args) => {
  if (args.length < arity) {
    return namedCurryFunction.bind(null, ...args);
  }
  return fn.call(null, ...args);
}

/**
 * Curryify a function. Allow the function to be called with less parameters that it needs and return a function with the
 * remaining parameters
 *
 * @func
 * @category Function
 * @sig ((a, b, ...) -> c) -> a -> b -> ... -> c
 * @param {Function} function the function to currify
 * @return {Function}
 */
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

/**
 * Curryify a function, from another defined function
 *
 * @func
 * @category Function
 * @sig ((a, b, ...) -> c) -> a -> b -> ... -> c
 * @param {Function} funcWithArgs the function to take args from
 * @param {Function} variadicFunc the variadic function to currify
 * @return {Function}
 * @see curry
 */
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

/**
 * Curryify a function, with a arbitrary arity
 *
 * @func
 * @category Function
 * @sig ((a, b, ...) -> c) -> a -> b -> ... -> c
 * @param {Integer} arity the function to take args from
 * @param {Function} variadicFunc the variadic function to currify
 * @return {Function}
 * @see curry
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


// diverge :: ((a->b),(a->c),...,(a->z)) => [b,c,...z]
/**
 * Returns a function that accept an argument which will be applied to every function in parameter and given back as an array
 * AKA. Parallelized compose.
 *
 * @func
 * @category Function
 * @sig ((a->b),(a->c),...,(a->z)) => x => [b(x),c(x),...,z(x)]
 * @param {...Functions} functions the function to diverge
 * @return {Function}
 * @see compose
 * @example
 *
 * let fn1 = compose (uppercase,prop('key'))
 * let fn2 = compose (reverse,prop('another_key'))
 * let fn3 = diverge (fn1,fn2);
 * fn3 ( {'key':'foo', 'another_key':'bar'})
 * //  ['rab','FOO']
 *
 * diverge (fnA,fnB)(x) == [fnA(x),fnB(x)]
 *
 */
export const diverge = (...args)=> x => args.map(arg=> arg(x))


/**
 * compose a diverge with another function
 *
 * @func
 * @category Function
 * @sig
 * @param {Functions} function to compose
 * @param {...Functions} functions the function to diverge
 * @return {Function}
 * @see compose
 * @see diverge
 * @example
 *
 * let upKey =  key=> compose(asProp(key),uppercase,prop(key))
 * let lowKey =  key=> compose(asProp(key),lowercase,prop(key))
 * let merge = divergeThen(mergeAll)
 * let normalize = merge (upKey('firstname'),lowKey('lastname'))
 * normalize({firstname:'Bob',lastname:'Doe'})
 * // {firstname:'BOB',lastname:'doe'}
 *
 */
export const divergeThen = z =>(...args) => compose (z,diverge(...args))


// identity :: a -> a
/**
 * Identity function
 *
 * @func
 * @category Function
 * @sig
 * @param {Any}
 * @return {Any}
 * @see compose
 * @see diverge
 *
 */
export const identity = x => x;

// flip :: ((a,b)->c)  -> a -> b -> (b,a) -> c
// flip :: (a -> b -> c) -> b -> a -> c
/**
 * flip two arguments of a function
 *
 * @func
 * @category Function
 * @sig
 * @param {Function}
 * @return {Curry}
 * @see compose
 * @see curry
 *
 */
export const flip = curry((fn, a, b) => fn(b, a));

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
