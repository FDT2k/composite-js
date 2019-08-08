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

   const bindSelectorToState = curry((getState,selector)=>{
    return (state)=>{ // still can pass another state
      state = state || getState()
      return selector(state)
    }
  })


   const makeBindableSelectorCreator = curry ( (selectorCreator,state)=>{
    return curryN(selectorCreator,(...args)=>{
      return selectorCreator(...args)(state)
    },supertrace('bindable'))

  },supertrace('makeBindable'))

  let bindable = makeBindableSelectorCreator(creator);

  let bound = bindSelectorToState(getState)(bindable)
  console.log('bound',bound)
  let finalSelector = bound('a','b')

  console.log(finalSelector())

});
