/*
pipe

let piped = pipe(funca,funcb,funcc )

is the same as

piped = ()=>funcc(funcb(funca()))

 all arguments are passed through

let piped = pipeA(middleware1,middleware2,final_function)

piped('name','lastname','age')

*/
const pipeA = (...funcs) =>{
  if(funcs.length ===0){
    return (...arg) => arg
  }

  if(funcs.length ===1){
    return funcs[0]
  }

  return funcs.reduce((a, b) => (...args) => b(...a(...args)))
};

/*compose

Reverse of pipe

let composed = compose(
                  funca,
                  funcb,
                  funcc
                )

is the same as funca(funcb(funcc(...args)))
initially from redux,
The behavior has been altered for 0 parameter and to call all parameters
*/
const composeA= (...funcs)=> {
  if (funcs.length === 0) {
    return (...arg) => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce((a, b) => (...args) => a(...b(...args)))
}


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


const flat = a => [].concat.apply([], a);
/*


Kind of supercompose. Apply Fn to each item in ...fns


configure :: Fn(x(a),x(b),x(c),...,x(z)) -> a -> z  ==  Fn(x)(a,b,c,...,z) -> a -> z
*/
const distribute = x => fn =>(...funcs)=>{
  return x(...funcs.map( x=> fn(x)  ))
}


// map :: Functor f => (a -> b) -> f a -> f b
const map = curry((fn, f) => f.map(fn));


module.exports = {compose, composeA, pipe, pipeA, curry,merge,identity,map,distribute}
