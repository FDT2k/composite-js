'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

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
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
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

var Maybe =
/*#__PURE__*/
function () {
  _createClass(Maybe, [{
    key: "isNothing",
    get: function get() {
      return this.$value === null || this.$value === undefined;
    }
  }, {
    key: "isJust",
    get: function get() {
      return !this.isNothing;
    }
  }]);

  function Maybe(x) {
    _classCallCheck(this, Maybe);

    this.$value = x;
  }
  /*[util.inspect.custom]() {
    return this.isNothing ? 'Nothing' : `Just(${inspect(this.$value)})`;
  }*/
  // ----- Pointed Maybe


  _createClass(Maybe, [{
    key: "map",
    // ----- Functor Maybe
    value: function map(fn) {
      return this.isNothing ? this : Maybe.of(fn(this.$value));
    } // ----- Applicative Maybe

  }, {
    key: "ap",
    value: function ap(f) {
      return this.isNothing ? this : f.map(this.$value);
    } // ----- Monad Maybe

  }, {
    key: "chain",
    value: function chain(fn) {
      return this.map(fn).join();
    }
  }, {
    key: "join",
    value: function join() {
      return this.isNothing ? this : this.$value;
    } // ----- Traversable Maybe

  }, {
    key: "sequence",
    value: function sequence(of) {
      return this.traverse(of, identity);
    }
  }, {
    key: "traverse",
    value: function traverse(of, fn) {
      return this.isNothing ? of(this) : fn(this.$value).map(Maybe.of);
    }
  }], [{
    key: "of",
    value: function of(x) {
      return new Maybe(x);
    }
  }]);

  return Maybe;
}();

var trace = curry(function (tag, value) {
  console.log(tag, value);
  return value;
});
var trace_keys = curry(function (tag, value) {
  console.log(tag, Object.keys(value));
  return value;
});
var supertrace = curry(function (prefix, tag, value) {
  return trace(prefix + ' ' + tag, value);
});
var trace_prop = curry(function (tag, prop, value) {
  console.log(tag, value[prop]);
  return value;
});

//export const empty = string=> string.length==0;
// BOOL => BOOL
//export const notEmpty = compose(not,empty)

var not = function not(x) {
  return !x;
};
var _OR_ = curry(function (a, b, x) {
  return a(x) || b(x);
});
var _AND_ = curry(function (a, b, x) {
  return a(x) && b(x);
});
var _NOT_ = curry(function (a, x) {
  return !a(x);
}); //export const isStrictlyEqual = curry((value,item)=> value===item)

var isStrictlyEqual = curry(function (value, item) {
  return value === item;
});
var isStrictlyNotEqual = function isStrictlyNotEqual(value) {
  return compose(not, isStrictlyEqual(value));
};
var _typeof$1 = function _typeof$1(value) {
  return _typeof(value);
};
var is_type = function is_type(val) {
  return compose(isStrictlyEqual(val), _typeof$1);
};
var is_type_string = is_type('string');
var is_type_function = is_type('function');
var is_type_number = is_type('number');
var is_undefined = is_type('undefined');
var isNull = function isNull(x) {
  return x === null;
};

var is_type_bool = is_type('boolean');
var isNil = _OR_(isNull, is_undefined); //fucky number test in js can suck on this shit ..!..

var defaultTo = function defaultTo(val) {
  return compose(maybe(val, identity), Maybe.of);
};

var assign2 = curry(function (x, y) {
  return Object.assign({}, x, y);
});
var _merge = curry(function (a, b) {
  return assign2(a, b);
});
var merge = _merge;
var prop = curry(function (prop, obj) {
  return obj[prop];
});
var keys = function keys(o) {
  return Object.keys(o);
}; // String => Object => Object

var omit_key = curry(function (_omit, obj) {
  var o = {};
  Object.keys(obj).map(function (key) {
    if (key !== _omit) {
      o[key] = obj[key];
    }
  });
  return o;
});
var ensure_object_copy = assign2({});
/*
  String -> String -> Object -> Object
*/

var as_object_prop = curry(function (key, value, object) {
  var o = _objectSpread2({}, object);

  o[key] = value;
  return o;
}); //  a -> b -> Object

var as_prop = curry(function (key, value) {
  return flip(as_object_prop(key), defaultTo({}), value);
});
/*
 Spec
  for a given object for which values are function  returns a new object with

  {
    x: fn(a,b),
    y: fn(a,b,c),
  }

  spec(obj,a)
  => {
    x: fn(a,b)(a)
    y: fn(a,b,c)(a)
  }

*/
//Object -> List

var enlist = curry(function (obj) {
  return pipe(keys, map(function (x) {
    return as_prop(x, obj[x]);
  }))(obj);
});

var replace = curry(function (re, rpl, str) {
  return str.replace(re, rpl);
}); // test :: RegEx -> String -> Boolean

var test = curry(function (re, str) {
  return re.test(str);
}); // match :: Regex -> String -> List

var match = curry(function (re, str) {
  return str.match(re);
}); // concat :: String -> String

var concat = curry(function (a, b) {
  return a.concat(b);
}); // append :: String -> String

var append = flip(concat); // length :: String -> Number
var split = curry(function (sep, str) {
  return str.split(sep);
});
var repeat = curry(function (times, string) {
  return string.repeat(times);
});

var substract = curry(function (a, b) {
  return a - b;
});
var decrement = flip(substract)(1);

var joinList = curry(function (sep, array) {
  return array.join(sep);
}); //Function -> List -> List

var filter = curry(function (fn, array) {
  return array.filter(fn);
}); // a -> Function -> List -> a

var reduce = curry(function (initial_value, reducer, array) {
  return array.reduce(reducer, initial_value);
}); // Function -> List -> Number

var findIndex = curry(function (fn, array) {
  return array.findIndex(fn);
}); // value => List => Number

var findIndexEqual = compose(findIndex, isStrictlyEqual); // value => List => Number

var findIndexNotEqual = compose(findIndex, isStrictlyNotEqual); // value => List => List

var filterNotEqual = compose(filter, isStrictlyNotEqual); // value => List => List

var filterEqual = compose(filter, isStrictlyEqual);
var indexOf = curry(function (v, a) {
  return a.indexOf(v);
}); // reduce an array of subObjects to a merged object of all subObjects

var reduceToObject = reduce({}, merge);
/*Recursively call a Curried FN  with each array item of args

same as  spreading args fn (...args)

spread(fn)(args) == fn(...args)
*/
//spread :: fn -> [a,b,c...] -> fn(a,b,c,...)

var spread = curry(function (fn, args) {
  return reduce(fn, function (_fn, arg) {
    return _fn(arg);
  }, args);
}); // apply result of fn on the group
// ObjectReducer
// groupListByKey :: Object -> item -> Object

var groupListByKey = function groupListByKey(key) {
  return curry(function (result, item) {
    if (typeof result[item[key]] === 'undefined') result[item[key]] = [];
    result[item[key]].push(item);
    return result;
  });
};
var tail = function tail(arr) {
  return arr.slice(1);
};
var head = function head(arr) {
  return arr[0];
};
var slice = curry(function (x, a) {
  return a.slice(x);
});
var range = curry(function (start, length, a) {
  return a.slice(start, length);
});
var safeTail = defaultTo([])(tail);
var safeHead = defaultTo(null)(head); // ReduceListToObject:: ObjectReducer => key => Object => Object
//export const reduceListToObject = objectReducer => key => c.compose(as_prop(key),c.reduce({},objectReducer))

var reduceListByKey = function reduceListByKey(key) {
  return reduce({}, groupListByKey(key));
}; //shuffle [a] -> [a]

var reduceListByKeys = curry(function (_keys, list) {
  if (_keys.length == 0) return list;
  var h = head(_keys);
  var rest = safeTail(_keys);
  var res = reduceListByKey(h)(list);

  for (var key in res) {
    res[key] = reduceListByKeys(rest)(res[key]);
  }

  return res;
});
var sort = curry(function (fn, array) {
  return array.sort(fn);
});
var _sortAsc = curry(function (fn, a, b) {
  var aa = fn(a);
  var bb = fn(b);
  return aa < bb ? -1 : aa > bb ? 1 : 0;
});
var _sortDesc = curry(function (fn, a, b) {
  return _sortAsc(fn, b, a);
});
var _sortBy = curry(function (_sort, fn, array) {
  return slice(0, array).sort(_sort(fn));
});
var sortByA = _sortBy(_sortAsc);
var sortByD = _sortBy(_sortDesc);
var safe_push = curry(function (array, item) {
  return [].concat(_toConsumableArray(array), [item]);
});
var safe_stack = curry(function (array, item) {
  return [item].concat(_toConsumableArray(array));
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

var chain$1 = function chain(fork) {
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
    chain: chain$1(fork),
    join: function join(_) {
      return chain$1(fork)(identity);
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

/*
  The purpose of this is to collect output of chained tasks

  TaskCreator =  Function -> Task

*/

/*
  makeCollector :: Nothing -> Function -> Task
  return a <TaskCreator> that accumulate its argument in a <List> and resolves it
*/

var make_task_collector = function make_task_collector(_) {
  var collector = [];
  return function (res) {
    return Task(function (reject, resolve) {
      collector = safe_push(collector, res);
      resolve(collector);
    });
  };
}; // identity task is the same as identity but injected in a <Task>
// when forked, returns the same value

var makeIdentityTask = function makeIdentityTask(_) {
  return Task(function (reject, resolve) {
    resolve(_);
  });
};
/*
  expand a <List> of <Tasks> to add a <TaskCollector> after each one of them
*/

var collect_chain_reducer = curry(function (collector, acc, item) {
  acc.push(chain(item)); //  acc.push(map(trace('x')))

  acc.push(chain(collector));
  return acc;
}); // Fn -> [Fn] -> Task

/*

  pipe(
    identity,
    t1, -> 1
    collect, -> [1]
    t2, -> 2
    collect, [1,2]
    t3, -> 3
    collect, [1,2,3]
  )

  for a given <List> of <Task>; Chain them and accumulate the results in an array.
  returns <Task>
*/

var collect_chain = function collect_chain(collector) {
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return pipe.apply(void 0, [makeIdentityTask].concat(_toConsumableArray(reduce([], collect_chain_reducer(collector), args))));
  };
};
/*
  short hand to create a Task collector
  return a function that chain and accumulate results
*/

var useTaskCollector = compose(collect_chain, make_task_collector);
/*
  creates a full task chain helper
*/

var useTaskChainCollection = function useTaskChainCollection() {
  for (var _len2 = arguments.length, initial_tasks = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    initial_tasks[_key2] = arguments[_key2];
  }

  if (initial_tasks.length === 0) throw new Error('you have to provide at least 1 initial TaskCreator (Function that returns a Task)');
  var make_chain = useTaskCollector();

  var _run = make_chain.apply(void 0, initial_tasks);

  return {
    extend: function extend() {
      for (var _len3 = arguments.length, tasks = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        tasks[_key3] = arguments[_key3];
      }

      return function (a, b) {
        return pipe(_run, chain(make_chain.apply(void 0, tasks)))().fork(a, b);
      };
    },
    run: function run(a, b) {
      return _run().fork(a, b);
    },
    tasks: initial_tasks
  };
};
var ChainableTaskCreator = function ChainableTaskCreator(chain_maker, _fork) {
  return function () {
    var make_chain = chain_maker || useTaskCollector();
    var fork = typeof _fork === 'undefined' ? make_chain.apply(void 0, arguments) : pipe(_fork, chain(make_chain.apply(void 0, arguments)));
    return {
      chain: function chain() {
        return ChainableTaskCreator(make_chain, fork).apply(void 0, arguments);
      },
      fork: fork().fork
    };
  };
};

exports.ChainableTaskCreator = ChainableTaskCreator;
exports.collect_chain = collect_chain;
exports.collect_chain_reducer = collect_chain_reducer;
exports.makeIdentityTask = makeIdentityTask;
exports.make_task_collector = make_task_collector;
exports.useTaskChainCollection = useTaskChainCollection;
exports.useTaskCollector = useTaskCollector;
