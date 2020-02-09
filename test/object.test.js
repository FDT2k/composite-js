import {merge,makeMerge,mergeAll,spec} from '../src/object'
import {spread} from '../src/array'

import {curry} from '../src/core'


test("makemerge",()=>{

  let merge5 = makeMerge(5);
  let merge6 = makeMerge(6);

  expect(merge5).toBeInstanceOf(Function)
  expect(merge6).toBeInstanceOf(Function)

  let toMerge = [
    {a:'a'},
    {b:'a'},
    {c:'a'},
    {d:'a'},
    {e:'a'},
  ]

  let expected = { a: 'a', b: 'a', c: 'a', d: 'a', e: 'a' }

  let res = spread(merge5)(toMerge)
  expect(res).toBeInstanceOf(Object)
  expect(res).toEqual(expected)

  res = mergeAll(toMerge)
  expect(res).toBeInstanceOf(Object)
  expect(res).toEqual(expected)

})

test("spec",()=>{


  const tospec = {
      add: curry((x,y)=> x+y),
      times: curry((x,y)=> x*y),
  }

  const test = spec(tospec);
  const result = test(12);

  expect(
    result.add(1)
  ).toBe(13);

  expect(
    result.times(12)
  ).toBe(144)

  
})
