import * as c from '../src/validator'

test("empty string",()=>{

  expect(c.isEmptyString()).toBe(true)
  expect(c.isEmptyString('')).toBe(true)

  expect(c.isEmptyString(' ')).toBe(false)

  expect(c.isEmptyString('asdgas')).toBe(false)

  expect(c.isEmptyString({})).toBe(false)
  expect(c.isEmptyString(x=>x)).toBe(false)

})


test("email",()=>{

  expect(c.isEmail()).toBe(false)
  expect(c.isEmail('')).toBe(false)
  expect(c.isEmail('df')).toBe(false)
  expect(c.isEmail('@.com')).toBe(false)
  expect(c.isEmail('dfasd')).toBe(false)
  expect(c.isEmail('fabien@test.com')).toBe(true)

})
