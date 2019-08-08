const {curry,curryN,supertrace,compose} = require('../src/index')


test('curry', () => {

//  console.log(supertrace('fn')('lol')('ahi'))
  let fn = curry((x,y)=>{
    return x + y;
  },supertrace('fn'))

  console.log(fn(1)(2))

});




test('curryN', () => {

  let creator =  (_filterA,_filterB) => {
    console.log('creator filter',_filterA,_filterB)
    return state => {
      console.log('final state',state)
      return {state,_filterA,_filterB}
    }
  }

  const getState = ()=>{
    return {hello:'world'}
  }

   const bindCreatorToState = curry ( (state,selectorCreator)=>{
    return curryN(selectorCreator,(...args)=>{
      return ()=>selectorCreator(...args)(state())
    },supertrace('bindable'))

  },supertrace('makeBindable'))

  let bound = bindCreatorToState(getState)(creator);

  let finalSelector = bound('a','b');

  expect (finalSelector()).toEqual({state:getState(),_filterA:'a',_filterB:'b'})

});
