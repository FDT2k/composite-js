import * as c from 'bool'

test("Type", () => {
  let undef;
  let nul = null
  let values = [
    1,
    -1,
    0,
    0.3,
    'string',
    [0, 1, 2,'a'],
    {},
    x => x,
    undef,
    nul,
    false,
    true,
    '-0.31'
  ]

  let tests = [
    c.is_type_number,
     c.is_type_object,
     c.is_type_string,
     c.is_type_function,
     c.is_array,
     c.is_type_bool,
     c.is_numeric,
     c.is_type_scalar
  ]

  let expected = [
    [0,true,false,false,false,false,false,true,true],    //1
    [1,true,false,false,false,false,false,true,true],    // -1
    [2,true,false,false,false,false,false,true,true],    // 0
    [3,true,false,false,false,false,false,true,true],  // 0.3
    [4,false,false,true,false,false,false,false,true],  // string
    [5,false,false,false,false,true,false,false,false], // []
    [6,false,true,false,false,false,false,false,false], // {}
    [7,false,false,false,true,false,false,false,false], // fn
    [8,false,false,false,false,false,false,false,false], // undefined
    [9,false,false,false,false,false,false,false,false],  //null
    [10,false,false,false,false,false,true,false,true],  //false
    [11,false,false,false,false,false,true,false,true],  //true
    [12,false,false,true,false,false,false,false,true],  //true
  ]

  expect(c.is_type_function(x => x)).toBe(true)
  expect(c.is_type_function(0)).toBe(false)
  let result = [];
  
  for (let _v = 0; _v < values.length; _v++) {
    
    result[_v] = [];
    result[_v][0]=_v
    for (let _t = 0; _t < tests.length; _t++) {
      result[_v][_t+1] = tests[_t](values[_v])
    }
  }
  expect(result).toEqual(expected)

})
/*
test("bool funcs", () => {
  expect(c.empty('')).toBe(true)
  expect(c.empty('asgdasdg')).toBe(false)

  expect(c.notEmpty('')).toBe(false)
  expect(c.notEmpty('asgdasdg')).toBe(true)

  expect(c.is_array([])).toBe(true)
  expect(c.is_array({})).toBe(false)
  expect(c.is_array('prout')).toBe(false)

})
*/

test("Gates", () => {

  const AorB = c._OR_(x=>x=='a' , x=>x=='b')
  expect(
    AorB('c')
  ).toBe(false)
  expect(
    AorB('a')
  ).toBe(true)
  expect(
    AorB('b')
  ).toBe(true
  )


  const AorBorFunction = c._OR_(c.is_type_function,AorB)

  expect(
    AorBorFunction(x=>x)
  ).toBe(true)

  expect(
    AorBorFunction('a')
  ).toBe(true)
  expect(
    AorBorFunction('b')
  ).toBe(true)
  expect(
    AorBorFunction(undefined)
  ).toBe(false)
})

test("null , undef && nil", () => {


  expect(
    c.isNil(undefined)
  ).toBe(true)

  expect(
    c.isNil(null)
  ).toBe(true)

  expect(
    c.isNil('')
  ).toBe(false)
  expect(
    c.isNil(x=>x)
  ).toBe(false)


})
test("is boolean", () => {


  expect(
    c.is_type_bool(true)
  ).toBe(true)

  expect(
    c.is_type_bool('fabie')
  ).toBe(false)
  expect(
    c.is_type_bool(234)
  ).toBe(false)


})


test("is scalar", () => {


  expect(
    c.is_type_scalar(true)
  ).toBe(true)

  expect(
    c.is_type_scalar('fabie')
  ).toBe(true)
  expect(
    c.is_type_scalar(234)
  ).toBe(true)

  expect(
    c.is_type_scalar(x => x)
  ).toBe(false)
  expect(
    c.is_type_scalar([])
  ).toBe(false)
  expect(
    c.is_type_scalar({})
  ).toBe(false)
  expect(
    c.is_type_scalar(new Array)
  ).toBe(false)

})


test("Numbers", () => {
  let i = 4512

  expect(
    c.is_type_number(i)
  ).toBe(true)
  expect(
    c.is_type_number('4152')
  ).toBe(false)

  expect(
    c.is_type_number(parseInt('4152'))
  ).toBe(true)

  expect(
    c.is_numeric(parseInt('wrong'))
  ).toBe(false)

  expect(
    c.is_type_number(parseInt('wrong'))
  ).toBe(true)

  expect(
    c.is_type_number(x => x)
  ).toBe(false)

  expect(
    c.is_numeric(x => x)
  ).toBe(false)




})

/*
test("prop equalities", () => {
  let o = { id: 23 }
  expect(
    c.isPropStrictlyEqual('id', 23, o)
  ).toBe(true)

  let byname = c.isPropStrictlyEqual('name');

  expect(
    byname('fabien', { name: 'fabien' })
  ).toBe(true)

  expect(
    byname('george', { name: 'fabien' })
  ).toBe(false)


})
*/