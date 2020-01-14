
// curry that allow empty args
export const curryNull = (fn)=>{
  const arity = fn.length;
  return (...args)=>{
    let idx = 0;
    let prevArgs = null
    let curr =  function $curryNull() {

      console.log(prevArgs,args,idx,arity)

      if(prevArgs == null ){ // never called
        if(args.length == 0)
          args = [null]
        idx += args.length
      }


      if(prevArgs != null){
        if(args.length < arity){
          args.push(null)
        }
      }


      return callCurry($curryNull)(arity)(fn)(...args)

    }
    let res = curr()
    prevArgs = args

    return res;
  }
}

export function make_curry(arity){
  return function $curry(...args){
    if (args.length < arity) {
      return $curry.bind(null, ...args);
    }
    return fn.call(null, ...args);
  }
}
/*
pipe

let piped = pipe(funca,funcb,funcc )

is the same as

piped = ()=>funcc(funcb(funca()))

 all arguments are passed through

let piped = pipeA(middleware1,middleware2,final_function)

piped('name','lastname','age')

*/
export const pipeA = (...funcs) =>{
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
export const composeA = (...funcs)=> {
  if (funcs.length === 0) {
    return (...arg) => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce((a, b) => (...args) => a(...b(...args)))
}


/*
Kind of supercompose. Apply Fn to each item in ...fns

configure :: Fn(x(a),x(b),x(c),...,x(z)) -> a -> z  ==  Fn(x)(a,b,c,...,z) -> a -> z
*/
export const distribute = z => fn =>(...funcs)=>{
  return z(...funcs.map( x=> fn(x)  ))
}
