'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var chalk = _interopDefault(require('chalk'));

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
}; // curry that allow empty args
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
  for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
    args[_key5] = arguments[_key5];
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
});

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

var flatten = function flatten(a) {
  return [].concat.apply([], a);
};
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

var mergeAll = function mergeAll(list) {
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

/*
  my idea of a combinator is to have a function that return an object with composite properties.
  Purpose of this, is to make reusable and combinable code blocks

  Some theory:

  MakeCombinator: make a combinator with an ArgsCombinator

  Combinator: store arguments by using an ArgsCombinator, return a function that accept an ArgEnhancer and combine them to an object
    signature: [Arg] -> ArgEnhancer -> Object

  ArgsCombinator: return an array of args
    signature: [a,...,z] -> [a,...,z]
    role: sanitize and normalize args.

  ArgEnhancer:
    signature: ( Arg-> b )
    role: enhancer to modify an arg value

  Arg:
    signature: ArgEnhancer -> x
    role: return a function that accept an ArgEnhancer and apply it to x

  Prop:
    signature: key -> ArgEnhancer -> Arg -> x
    role: return a property to compose the final object

  ArgTransformer:
    signature: a -> b
    role: transform an Arg of type a into type b


*/
// Scalar x -> a-> Object as {x:a}

var asProp = as_prop; // apply enhancer to the current key
// Scalar x -> ArgEnhancer -> a  ->  Object as {x:a}

var asEnhancedProp = curry(function (key, enhance) {
  return compose(asProp(key), enhance);
});
var enhancedPropWithDefaultEnhancer = function enhancedPropWithDefaultEnhancer(key) {
  return compose(asEnhancedProp(key), defaultTo(identity));
}; // enhance is not currified because we want to be able to call with no arg which currying doesn't allow ()

var asFunctionProp = curry(function (key, func) {
  return function (enhance) {
    return enhancedPropWithDefaultEnhancer(key)(enhance)(func);
  };
});
var asScalarProp = curry(function (key, value) {
  return function (enhance) {
    return enhancedPropWithDefaultEnhancer(key)(enhance)(value);
  };
}); // if no value, the default is the value of the key

var asScalarPropWithDefaultValue = function asScalarPropWithDefaultValue(key) {
  return function (value) {
    return function (enhance) {
      return compose(enhancedPropWithDefaultEnhancer(key)(enhance), defaultTo(key))(value);
    };
  };
}; // transform an arg of a type into another

var transformArgToFunctionIfNeeded = function transformArgToFunctionIfNeeded(defaultFn) {
  return either(is_type_function, defaultFn, identity);
};
var flattenArgsCombinator = flatten;
var defaultArgTransformer = function defaultArgTransformer(x) {
  return asScalarPropWithDefaultValue(x)(x);
};
var defaultCombineArgs = map(transformArgToFunctionIfNeeded(defaultArgTransformer));
var defaultArgsCombinator = compose(defaultCombineArgs, flattenArgsCombinator); //ArgumentCombinator ::  [a] -> [b]
//makeCombine :: ArgumentCombinator -> (a...z) => Object

var makeObjectCombinator = function makeObjectCombinator(argsCombinator) {
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return divergeThen(mergeAll).apply(void 0, _toConsumableArray(argsCombinator(args)));
  };
};
var makeExpander = curry(function (argType, transform, subTypes, type) {
  return subTypes.map(function (subType) {
    return argType(transform(type, subType));
  });
});
var combineObject = makeObjectCombinator(defaultArgsCombinator);

var safePropCall = function safePropCall(x) {
  return function (z) {
    return function () {
      return x[z].apply(x, arguments);
    };
  };
};
var match$1 = curry(function (re, str) {
  return re.test(str);
});

var safeConsoleLog = function safeConsoleLog(x) {
  return console.log(x);
};

var safeChalk = safePropCall(chalk);

var colorize = function colorize(color) {
  return safeChalk(color);
}; //const colorLog = color =>  c.compose(safeConsoleLog,safeChalk(color));


var logTask = compose(colorize('bgGreen'), colorize('black'));
var skipTask = compose(colorize('bgRed'), colorize('yellow'));
var erroredTask = compose(colorize('bgRed'), colorize('black'));
var combine = combineObject;
var callStackColor = compose(colorize('bgBlack'), colorize('grey'));
var combinedColorizer = combine(asFunctionProp('error', colorize('red')), asFunctionProp('warn', colorize('yellow')), asFunctionProp('log', colorize('green')), asFunctionProp('info', colorize('grey')), asFunctionProp('task', logTask), asFunctionProp('skippedTask', skipTask), asFunctionProp('critical', erroredTask), asFunctionProp('subLog', compose(colorize('bgBlack'), colorize('yellow'))), asFunctionProp('actLog', compose(colorize('bgBlack'), colorize('green'))), asFunctionProp('trace', compose(colorize('yellow'))));

var logEnhancer = function logEnhancer(fn) {
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return safeConsoleLog(fn.apply(void 0, _toConsumableArray(args.map(function (arg) {
      var is_error = arg instanceof Error;

      if (!is_error) {
        switch (_typeof(arg)) {
          case 'object':
            return "Object - keys:[".concat(Object.keys(arg), "]");

          default:
            return arg;
        }
      } else {
        return "\n".concat(arg, " ").concat(callStackColor(arg.stack));
      }
    }))));
  };
};

var logify = function logify(arg) {
  var is_error = arg instanceof Error;

  if (!is_error) {
    switch (_typeof(arg)) {
      case 'object':
        return "Object - keys:[".concat(Object.keys(arg), "]");

      default:
        return arg;
    }
  } else {
    return "\n".concat(arg, " ").concat(callStackColor(arg.stack));
  }
};

var processLog = function processLog() {
  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  return _toConsumableArray(args.map(logify));
};

var logEnhancerDetails = function logEnhancerDetails(fn) {
  return function () {
    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    return safeConsoleLog(fn(processLog(args)));
  };
};

var logger = combinedColorizer(logEnhancer);
var superLogger = combinedColorizer(logEnhancerDetails);

exports.logger = logger;
exports.superLogger = superLogger;
