const {compose} = require('../src/index')


test('calling compose without parameter should return args', () => {
  const result = compose()
  expect(result('hello')[0]).toBe('hello')
  expect(result('hello','world')[1]).toBe('world')

});


test('calling compose with 1 parameter should work ', () => {
  const result = compose((...args)=>args.map(item=>item.toUpperCase()))
  expect(result('hello')[0]).toBe('HELLO')
});


test('compose', () => {
  let args = ['hello','world']
  const funcA =(...args)=>{
    console.log('funcA')
    console.log(args.length)
    
    return args
  }

  const funcB =(...args)=>{
    console.log('funcB')
    console.log(args.length)
    return args.map(arg=>arg.toUpperCase())
  }

  const result = compose(
    funcA,
    funcB
  )

  let data = result(...args)

});
