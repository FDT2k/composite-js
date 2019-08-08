
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
const curry = (fn,trace=null) => {
  //console.log(trace)
  if (trace !== null)
    trace('curried ',fn.length + ' args')
  const arity = fn.length;
  return function $curry(...args) {
    if (args.length < arity) {
      if (trace !== null)
        trace('applied ',args)
      return $curry.bind(null, ...args);
    }
    if (trace !== null)
      trace('call ',args)
    return fn.call(null, ...args);
  };
}

// trace:: String -> a -> a
const trace = curry((tag,value) => {
  console.log(tag,value);
  return value;
})
const supertrace = curry((prefix ,tag,value) => trace(prefix+ ' '+tag,value))


// merge :: Object-> Object
const merge = a => b => ({...a,...b})
const identity = x => x;
const callee = x => x();


const flip = curry((fn, a, b) => fn(b, a));

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


module.exports = {compose, pipe, curry,merge,identity,map,distribute,trace,callee,flatten,supertrace,flip,experimental:{pipeA,composeA}}
