/*
pipe

let piped = pipe(funca,funcb,funcc )

is the same as

piped = ()=>funcc(funcb(funca()))

 all arguments are passed through

let piped = pipeA(middleware1,middleware2,final_function)

piped('name','lastname','age')

*/
const pipe = (...ops) =>{
  if(ops.length ===0){
    return (...arg) => arg
  }

  if(ops.length ===1){
    return ops[0]
  }

  return ops.reduce((a, b) => (...args) => b(...a(...args)))
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
const compose= (...funcs)=> {
  if (funcs.length === 0) {
    return (...arg) => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce((a, b) => (...args) => a(...b(...args)))
}


module.exports = {compose,pipe,pipeA:pipe}
