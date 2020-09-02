'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

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

/* Function is adapted from Redux 4 

List => createStore => Reducer => Store
*/

var applyMiddlewares = curry(function (middlewares, createStore) {
  return function (reducer) {
    var _dispatch = identity;

    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var store = createStore.apply(void 0, [reducer].concat(args));
    var middlewareAPI = {
      getState: store.getState,
      dispatch: function dispatch(action) {
        for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          args[_key2 - 1] = arguments[_key2];
        }

        return _dispatch.apply(void 0, [action].concat(args));
      }
    };
    var chain = middlewares.map(function (middleware) {
      return middleware(middlewareAPI);
    });
    _dispatch = compose.apply(void 0, _toConsumableArray(chain))(store.dispatch);
    return _objectSpread2(_objectSpread2({}, store), {}, {
      dispatch: _dispatch
    });
  };
});
var thunk = curry(function (store, next, action) {
  return typeof action === 'function' ? action(store) : next(action);
});
var task = curry(function (store, next, action) {
  return typeof action !== 'undefined' && typeof action.fork !== 'undefined' && typeof action.fork === 'function' ? action.fork(next, next) : next(action);
});
var taskCreator = curry(function (store, next, action) {
  return typeof action.task !== 'undefined' && typeof action.task === 'function' ? action.task(store).fork(next, next) : next(action);
});
var logger = curry(function (store, next, action) {
  console.log('[MINUX_LOGGER]:', action);
  next(action);
});
var createStore = function createStore(reducer, initialState) {
  var state = initialState;

  var getState = function getState(_) {
    return state;
  };

  var listeners = [];

  var dispatch = function dispatch(action) {
    state = reducer(state, action);

    for (var i = 0; i < listeners.length; i++) {
      listeners[i]();
    }

    return action;
  };

  var subscribe = function subscribe(listener) {
    listeners.push(listener);
    return function (_) {
      var index = listeners.indexOf(listener);
      listeners.splice(index, 1);
    };
  };

  var store = {
    dispatch: dispatch,
    getState: getState,
    subscribe: subscribe
  };
  dispatch({
    type: '-_-'
  });
  return store;
};
var observeStore = function observeStore() {
  var select = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : identity;
  var store = arguments.length > 1 ? arguments[1] : undefined;
  var onChange = arguments.length > 2 ? arguments[2] : undefined;
  var currentState;

  function handleChange() {
    var nextState = select(store.getState());

    if (nextState !== currentState) {
      onChange(currentState, nextState);
      currentState = nextState;
    }
  }

  var unsubscribe = store.subscribe(handleChange);
  handleChange();
  return unsubscribe;
};
var index = applyMiddlewares([thunk, task, taskCreator], createStore);

exports.applyMiddlewares = applyMiddlewares;
exports.createStore = createStore;
exports.default = index;
exports.logger = logger;
exports.observeStore = observeStore;
exports.task = task;
exports.taskCreator = taskCreator;
exports.thunk = thunk;
