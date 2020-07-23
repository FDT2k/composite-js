'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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
}; // curry that allow empty args

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

var maybe = curry(function (value, fn, functor) {
  if (functor.isNothing) {
    return value;
  }

  return fn(functor.$value);
});

/*
chain(fn) {
    return new Task((reject, resolve) => this.fork(reject, x => fn(x).fork(reject, resolve)));
  }

  join() {
    return this.chain(identity);
  }
*/

var map$1 = function map(fork) {
  return function (f) {
    return Task(function (reject, resolve) {
      return fork(reject, function (a) {
        return resolve(f(a));
      });
    });
  };
};

var chain = function chain(fork) {
  return function (f) {
    return Task(function (reject, resolve) {
      return fork(reject, function (a) {
        return f(a).fork(reject, resolve);
      });
    });
  };
};

var Task = function Task(fork) {
  return {
    map: map$1(fork),
    chain: chain(fork),
    join: function join(_) {
      return chain(fork)(identity);
    },
    fork: fork
  };
};

Task.of = function (a) {
  return Task(function (_, res) {
    return res(a);
  });
};

Task.rejected = function (a) {
  return Task(function (rej, _) {
    return rej(a);
  });
};

var TaskFromPromiseThunk = function TaskFromPromiseThunk(promise) {
  return Task(function (reject, resolve) {
    return promise().then(resolve)["catch"](reject);
  });
};

var TaskFromPromise = function TaskFromPromise(promise) {
  return TaskFromPromiseThunk(function (_) {
    return promise;
  });
};

var MakeTask = function MakeTask(task) {
  return function (_) {
    return Task(task);
  };
};

exports.MakeTask = MakeTask;
exports.Task = Task;
exports.TaskFromPromise = TaskFromPromise;
exports.TaskFromPromiseThunk = TaskFromPromiseThunk;
