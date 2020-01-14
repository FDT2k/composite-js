import * as c from '../src/index'
import util from 'util'

test ("Type",()=>{
  let undef;
  let nul= null
  let test_values = [
    1,
    -1,
    0,
    0.3,
    'string'
    [0,1,2],
    {},
    x=>x,
    undef,
    nul
  ]

  let tests = [
  //  c.is_type_number,
  //  c.is_type_object,
    c.is_type_string,
    c.is_type_function,
  //  c.is_array
  ]

  let expected = [
  //  [true,true,true,true,false,false,false,false],
  //  [false,false,false,false,false,true,true,false],
  [false,false,false,false,true,false,false,false,false],

    [false,false,false,false,false,false,true,false,false],
  //  [false,false,false,false,false,true,false,false],//is_array
  ]

  expect(c.is_type_function(x=>x)).toBe(true)
  expect(c.is_type_function(0)).toBe(false)

  for(let _value = 0;_value < test_values.length; _value++){
    for(let _test = 0; _test < tests.length; _test++){
  //    console.log(test_values[_value],tests[_test](test_values[_value]), expected[_test][_value],_test,_value,typeof(test_values[_value]))
      expect(tests[_test](test_values[_value])).toBe(expected[_test][_value])
    }
  }

})
test ("bool funcs",()=>{
  expect(c.empty('')).toBe(true)
  expect(c.empty('asgdasdg')).toBe(false)

  expect(c.notEmpty('')).toBe(false)
  expect(c.notEmpty('asgdasdg')).toBe(true)

  expect(c.is_array([])).toBe(true)
  expect(c.is_array({})).toBe(false)
  expect(c.is_array('prout')).toBe(false)

})



test ("_either",()=>{
  let no = x=>`no`
  let yes = x=>`yes`
  let undef
  let notundef= 'couocu'
  expect(
    c._either(c.empty,no,yes)('')
  ).toBe('yes')

  expect(
    c._either(c.empty,no,yes)('sdsd')
  ).toBe('no')

  expect(
    c._eitherUndefined(no,yes)(undef)
  ).toBe('yes')

  expect(
    c._eitherUndefined(no,yes)(notundef)
  ).toBe('no')

  expect(
    ()=>{
      c._eitherThrow(c.empty,'should be empty')('caca')
    }
  ).toThrow('should be empty');


})
test ("is boolean",()=>{


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


test ("is scalar",()=>{


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
    c.is_type_scalar(x=>x)
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


test ("Numbers",()=>{
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
    c.is_type_number(x=>x)
  ).toBe(false)

  expect(
    c.is_numeric(x=>x)
  ).toBe(false)




})


test ("prop equalities",()=>{
  let o = {id:23}
  expect(
    c.is_prop_strictly_equal('id',23,o)
  ).toBe(true)

  let byname = c.is_prop_strictly_equal('name');

  expect(
    byname('fabien',{name:'fabien'})
  ).toBe(true)

  expect(
    byname('george',{name:'fabien'})
  ).toBe(false)


})



test ('trycatcher', (done)=>{

  const on_error = (err)=>{
    console.error(err)
  }

  const working_fn = ()=>{

    done()

  }
  c.tryCatcher(on_error,working_fn,null);

});

test ('trycatcher is catching', (done)=>{

  const failing_fn = ()=>{
    coucouasdnoiadfsjiadfoij
  }

  const catch_err = (err)=>{
    done();
  }
  c.tryCatcher(catch_err,failing_fn,null)


})
