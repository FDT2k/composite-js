'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * Compose several unary function into one function. Execution is done from right to left
 *
 * @func
 * @category Function
 * @sig ((y -> z), (x -> y), ..., (o -> p), ((a, b, ..., n) -> o)) -> ((a, b, ..., n) -> z)
 * @param {...Function} ...functions The functions to compose
 * @return {Function}
 */
var compose = function compose() {
  for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(function (a, b) {
    return function () {
      return a(b.apply(void 0, arguments));
    };
  });
};
/**
 * Compose several unary function into one function. Execution is done left to right
 *
 * @func
 * @category Function
 * @sig ((y -> z), (x -> y), ..., (o -> p), ((a, b, ..., n) -> o)) -> ((a, b, ..., n) -> z)
 * @param {...Function} ...functions The functions to compose
 * @return {Function}
 */

var pipe = function pipe() {
  for (var _len2 = arguments.length, funcs = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    funcs[_key2] = arguments[_key2];
  }

  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(function (a, b) {
    return function () {
      return b(a.apply(void 0, arguments));
    };
  });
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

var callCurry = function callCurry(namedCurryFunction) {
  return function (arity) {
    return function (fn) {
      return function () {
        for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          args[_key3] = arguments[_key3];
        }

        if (args.length < arity) {
          return namedCurryFunction.bind.apply(namedCurryFunction, [null].concat(args));
        }

        return fn.call.apply(fn, [null].concat(args));
      };
    };
  };
};
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


var curry = function curry(fn) {
  var arity = fn.length;
  return function $curry() {
    return callCurry($curry)(arity)(fn).apply(void 0, arguments);
  };
}; // curryN :: ((a, b, ...),(a, b, ...)) ->(a, b, ...) -> c) -> a -> b -> ... -> c

/**
 *   Generating a N-arity curry from another non-variadic defined Function.
 *
 *   Idea to help composing variadics
 *
 *
 * @func
 * @category Function
 * @sig ((a, b, ...) -> c) -> a -> b -> ... -> c
 * @param {Function} funcWithArgs the function to take args from
 * @param {Function} variadicFunc the variadic function to currify
 * @return {Function}
 * @see curry
 */

var curryN = function curryN(fn, callFn) {
  var arity = fn.length;
  return function $curryN() {
    return callCurry($curryN)(arity)(callFn).apply(void 0, arguments);
  };
};
/**
 * Generating a curry with a static arity while calling another function
 *
 * @func
 * @category Function
 * @sig ((a, b, ...) -> c) -> a -> b -> ... -> c
 * @param {Integer} arity The arity
 * @param {Function} variadicFunc the variadic function to currify
 * @return {Function}
 * @see curry
 */

var curryX = function curryX(_arity, fn) {
  var arity = _arity;
  return function $curryX() {
    return callCurry($curryX)(arity)(fn).apply(void 0, arguments);
  };
};
/**
 * Returns a function that accept one argument. The argument  will be passed to every function in parameter and given back as an array
 * AKA. Parallelized composition. I'm not even sure this is a thing.
 * It's a mix between compose and spec
 *
 * @func
 * @category Function
 * @sig ((a->b),(a->c),...,(a->z)) => x => [b(x),c(x),...,z(x)]
 * @param {...Functions} functions the functions to diverge
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
 * diverge (fnA,fnB)(x) == [ fnA(x) , fnB(x) ]
 *
 */

var diverge = function diverge() {
  for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    args[_key4] = arguments[_key4];
  }

  return function (x) {
    return args.map(function (arg) {
      return arg(x);
    });
  };
};
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

var divergeThen = function divergeThen(z) {
  return function () {
    return compose(z, diverge.apply(void 0, arguments));
  };
}; // identity :: a -> a

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

var identity = function identity(x) {
  return x;
}; // flip :: ((a,b)->c)  -> a -> b -> (b,a) -> c
// flip :: (a -> b -> c) -> b -> a -> c

/**
 * flip two arguments of a function
 *
 * @func
 * @category Function
 * @sig ( FN -> b -> c)  ->
 * @param {Function}
 * @return {Curry}
 * @see compose
 * @see curry
 *
 */

var flip = curry(function (fn, a, b) {
  return fn(b, a);
}); // map :: fn f => (a -> b) -> f a -> f b
// map :: Functor f => (a -> b) -> f a -> f b

var map = curry(function (fn, f) {
  return f.map(fn);
}); // join :: Monad m => m (m a) -> m a

var join = function join(m) {
  return m.join();
}; // chain :: Monad m => (a -> m b) -> m a -> m b

var chain = function chain(f) {
  return compose(join, map(f));
}; // maybe :: b -> (a -> b) -> Maybe a -> b

var maybe = curry(function (value, fn, functor) {
  if (functor.isNothing) {
    return value;
  }

  return fn(functor.$value);
});

exports.chain = chain;
exports.compose = compose;
exports.curry = curry;
exports.curryN = curryN;
exports.curryX = curryX;
exports.diverge = diverge;
exports.divergeThen = divergeThen;
exports.flip = flip;
exports.identity = identity;
exports.join = join;
exports.map = map;
exports.maybe = maybe;
exports.pipe = pipe;
