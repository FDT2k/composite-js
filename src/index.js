/*
Classic pipe

let piped = pipe(funca,funcb,funcc )

is the same as

piped = ()=>funcc(funcb(funca()))

*/
const _pipe = (a, b) => (arg) => b(a(arg));
module.pipe = (...ops) => ops.reduce(_pipe);


/*
Same as pipe except that all arguments are passed through

let piped = pipeA(middleware1,middleware2,final_function)

piped('name','lastname','age')

*/
const _pipeA = (a, b) => (...args) => b(...a(...args));
module.pipeA = (...ops) => ops.reduce(_pipeA);

/*compose

Reverse of pipe

let composed = compose(
                  funca,
                  funcb,
                  funcc
                )

is the same as funca(funcb(funcc(...args)))
*/
module.compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}
