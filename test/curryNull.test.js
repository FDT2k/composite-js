import {curry,curryN,curryX,curryNull,supertrace,compose} from 'Core'




test('curryNull',()=>{
  let fn = curryNull ( (x,y)=>{

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
/*
  expect (
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
  ).toEqual([null,null])*/
  expect (
    fn(19)(21)
  ).toEqual([19,21])
 /* expect (
    fn()()
  ).toEqual([null,null])

  expect (
    fn2(1,2,3)()
  ).toEqual([1,2,3,null])

  expect (
    fn2()()()()
  ).toEqual([null,null,null,null])
  
  expect (
    fn2()(2)()(4)
  ).toEqual([null,2,null,4])
*/
})
