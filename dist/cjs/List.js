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

//export const empty = string=> string.length==0;
// BOOL => BOOL
//export const notEmpty = compose(not,empty)

var not = function not(x) {
  return !x;
};
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

var is_type_bool = is_type('boolean'); //fucky number test in js can suck on this shit ..!..

var defaultTo = function defaultTo(val) {
  return compose(maybe(val, identity), Maybe.of);
};

var assign2 = curry(function (x, y) {
  return Object.assign({}, x, y);
});
var _merge = curry(function (a, b) {
  return assign2(a, b);
});
var merge$1 = _merge;
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

var spec = curry(function (obj, arg) {
  return pipe(keys, map(function (x) {
    return as_prop(x, obj[x](arg));
  }), mergeAll)(obj);
}); //Object -> List

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

var filterEqual = compose(filter, isStrictlyEqual); // reduce an array of subObjects to a merged object of all subObjects

var reduceToObject = reduce({}, merge$1);
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
  if(cond is met, return right else return left)
*/

var either = curry(function (cond, left, right, val) {
  return cond(val) ? right(val) : left(val);
});
var eitherUndefined = either(is_undefined);
var _throw = function _throw(x) {
  return function (val) {
    throw new Error(x);
  };
}; //interrupt everything

var eitherThrow = curry(function (cond, error) {
  return either(cond, _throw(error), identity);
});
var tryCatcher = curry(function (catcher, tryer, arg) {
  try {
    return tryer(arg);
  } catch (err) {
    return catcher(arg, err);
  }
});

var makeMerge = function makeMerge(arity) {
  return curryX(arity, function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return reduce({}, function (a, b) {
      return merge(a, b);
    }, args);
  });
}; // mergeAll :: [{a},{b},{c}]-> {a,b,c,d}

var mergeAll$1 = function mergeAll(list) {
  return reduce({}, assign2, list);
};
var delete_list_item = curry(function (state, action) {
  return filter(function (item) {
    return item.id != action.payload;
  }, state);
});
var add_list_item = curry(function (state, action) {
  return [].concat(_toConsumableArray(state), [action.payload]);
});
var item_prop_is_equal = curry(function (prop, value, item) {
  return item[prop] == value;
});
var add_to_list = curry(function (state, action) {
  return [].concat(_toConsumableArray(state), [action.payload]);
}); // del_from_list :: List -> Object-> List

var del_from_list_by_prop_id = curry(function (state, action) {
  return filter(function (item) {
    return item.id != action.payload;
  }, state);
}); // update_object :: Object->Object->Object

var update_object = assign2; // update_list_by_prop_id :: List -> a -> Fn -> List

var update_list_by_prop_id = curry(function (list, itemIdValue, updateFn) {
  return update_list(list, item_prop_is_equal('id', itemIdValue), updateFn);
}); // update_list :: List -> Fn -> Fn -> List

var update_list = curry(function (list, itemPredicate, updateFn) {
  return list.map(function (item) {
    return either(itemPredicate, identity, updateFn, item);
  });
});
var propIsEqual = curry(function (prop, value, item) {
  return item[prop] === value;
});
var propIsNotEqual = curry(function (prop, value, item) {
  return item[prop] !== value;
});
var delByProp = curry(function (prop, list, val) {
  return filter(propIsNotEqual(prop, val), list);
});
var delByPropId = delByProp('id');
var add = curry(function (list, item) {
  return [].concat(_toConsumableArray(list), [item]);
});
var getByProp = curry(function (prop, list, val) {
  return filter(propIsEqual(prop, val), list);
});
var update = curry(function (cond, val, list, fn) {
  return map(either(cond(val), identity, fn))(list);
});
var updateIfPropEqual = curry(function (prop, val, list, fn) {
  return update(propIsEqual(prop), val, list, fn);
});

exports.add = add;
exports.add_list_item = add_list_item;
exports.add_to_list = add_to_list;
exports.delByProp = delByProp;
exports.delByPropId = delByPropId;
exports.del_from_list_by_prop_id = del_from_list_by_prop_id;
exports.delete_list_item = delete_list_item;
exports.getByProp = getByProp;
exports.item_prop_is_equal = item_prop_is_equal;
exports.makeMerge = makeMerge;
exports.mergeAll = mergeAll$1;
exports.propIsEqual = propIsEqual;
exports.propIsNotEqual = propIsNotEqual;
exports.update = update;
exports.updateIfPropEqual = updateIfPropEqual;
exports.update_list = update_list;
exports.update_list_by_prop_id = update_list_by_prop_id;
exports.update_object = update_object;
