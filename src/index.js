
const {composeA,pipeA} = require('./experimental')

// compose :: ((a -> b), (b -> c),  ..., (y -> z)) -> a -> z
const compose=(...funcs) =>{
  if (funcs.length === 0) {
    return arg => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}

const pipe = (...funcs) =>{
  if(funcs.length ===0){
    return arg => arg
  }

  if(funcs.length ===1){
    return funcs[0]
  }

  return funcs.reduce((a, b) => (...args) => b(a(...args)))
};

// curry :: ((a, b, ...) -> c) -> a -> b -> ... -> c
const curry = (fn) => {
  const arity = fn.length;

  return function $curry(...args) {
    if (args.length < arity) {
      return $curry.bind(null, ...args);
    }

    return fn.call(null, ...args);
  };
}


// merge :: Object-> Object
const merge = a => b => ({...a,...b})
const identity = x => x;


const flatten = a => [].concat.apply([], a);
/*


Kind of supercompose. Apply Fn to each item in ...fns

configure :: Fn(x(a),x(b),x(c),...,x(z)) -> a -> z  ==  Fn(x)(a,b,c,...,z) -> a -> z
*/
const distribute = x => fn =>(...funcs)=>{
  return x(...funcs.map( x=> fn(x)  ))
}


// map :: Functor f => (a -> b) -> f a -> f b
const map = curry((fn, f) => f.map(fn));


module.exports = {compose, pipe, curry,merge,identity,map,distribute,experimental:{pipeA,composeA}}
