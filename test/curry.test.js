const {curry,trace,compose} = require('../src/index')


test('curry', () => {

//  console.log(supertrace('fn')('lol')('ahi'))
  let fn = curry((x,y)=>{
    return x + y;
  },supertrace('fn'))

  console.log(fn(1)(2))

});
