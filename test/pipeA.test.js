const {pipeA,compose} = require('../src/index')


test('calling pipe without parameter should return args', () => {
  const result = pipeA()
  expect(result('hello')[0]).toBe('hello')
  expect(result('hello','world')[1]).toBe('world')
});


test('calling compose without parameter should return args', () => {
  const result = compose()
  expect(result('hello')[0]).toBe('hello')
  expect(result('hello','world')[1]).toBe('world')

});


test('calling pipe with 1 parameter should work ', () => {
  const result = pipeA((...args)=>args.map(item=>item.toUpperCase()))
  expect(result('hello')[0]).toBe('HELLO')
});

test('calling compose with 1 parameter should work ', () => {
  const result = compose((...args)=>args.map(item=>item.toUpperCase()))
  expect(result('hello')[0]).toBe('HELLO')
});

test('Pipe A', () => {
  const funcA =(lastname,firstname)=>{
    return [lastname,firstname]
  }

  const funcB =(lastname,firstname)=>{
    expect(lastname).toBe('bob')
    expect(firstname).toBe('doe')
  }

  const result = pipeA(
    funcA,
    funcB
  )
  result('bob','doe')
});



test('Pipe A', () => {
  let args = ['hello','world']
  const capitalize =(...args)=>{
    return args.map(item=>item.toUpperCase())
  }

  const funcB =(lastname,firstname)=>{
    expect(lastname).toBe('HELLO')
    expect(firstname).toBe('WORLD')
  }

  const result = pipeA(
    capitalize,
    funcB
  )

  result(...args)
});



test('compose', () => {
  let args = ['hello','world']
  const funcA =(...args)=>{
    console.log('funcA')
    return args
  }

  const funcB =(...args)=>{
    console.log('funcB')

  //  expect(lastname).toBe('HELLO')
  //  expect(firstname).toBe('WORLD')
    return args.map(arg=>arg.toUpperCase())
  }

  const result = compose(
    funcA,
    funcB
  )

  let data = result(...args)

});
