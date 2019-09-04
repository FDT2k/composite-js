const {curry,curryN,curryX,curryNull,supertrace,compose} = require('../src/index')


test('curry', () => {

//  console.log(supertrace('fn')('lol')('ahi'))
  let fn = curry((x,y)=>{
    return x + y;
  },supertrace('fn'))

  console.log(fn(1)(2))

});


test('curryNull',()=>{
/*  let fn = curryNull ( (x,y)=>{

    console.log('x',x)
    console.log('y',y)
    return [x,y]
  })

  let fn2 = curryNull ( (x,y,z,w)=>{

    console.log('x',x)
    console.log('y',y)
    console.log('z',z)
    console.log('w',w)
    return [x,y,z,w]
  })
  let fn3 = curryNull ( (a,b,c,d,e,x,y,z,w)=>{

    console.log('x',x)
    console.log('y',y)
    return [a,b,c,d,e,x,y,z,w]
  })
*/
/*  expect (
    fn()
  ).toBeInstanceOf(Function)

  expect (
    fn(null)
  ).toBeInstanceOf(Function)

  expect (
    fn(null)
  ).toBeInstanceOf(Function)

  expect (
    fn(null,null)
  ).toEqual([null,null])
  expect (
    fn()(null)
  ).toEqual([null,null])
  expect (
    fn(19)(21)
  ).toEqual([19,21])
  expect (
    fn()()
  ).toEqual([null,null])

  expect (
    fn2(1,2,3)()
  ).toEqual([1,2,3,null])

  expect (
    fn2()()()()
  ).toEqual([null,null,null,null])
  */
/*  expect (
    fn2()(2)()(4)
  ).toEqual([null,2,null,4])
*/
})

test('curryX',()=>{
  /*
    Generating a X arity curry to be help compose variadics
  */
  const expectingXArgs = arity => (...args)=>{
    console.log('expecting',arity, 'received',args.length)
    return arity == args.length
  }

  let makeExpecting = (arity) =>{
    let fn = expectingXArgs(arity)
    return curryX(arity,(...args)=>{
      return fn(...args)
    });
  }

  const expecting5 = makeExpecting(5);
  const expecting6 = makeExpecting(6);

  expect(expecting5(1,2,3,4,5)).toBe(true)
  expect(expecting6(1,2,3,4,5,6)).toBe(true)

  console.log(expecting5(1,2).name)

})

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
    })

  })

  let bound = bindCreatorToState(getState)(creator);

  let finalSelector = bound('a','b');

  expect (finalSelector()).toEqual({state:getState(),_filterA:'a',_filterB:'b'})

});
