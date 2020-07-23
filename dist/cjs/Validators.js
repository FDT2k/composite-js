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

var isEmail = compose(test(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/), defaultTo(''));
var isEmptyString = compose(isStrictlyEqual(''), defaultTo(''));

exports.isEmail = isEmail;
exports.isEmptyString = isEmptyString;
