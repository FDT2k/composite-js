import * as c from '../src/index'
import util from 'util'
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
