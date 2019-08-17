import {merge,makeMerge,mergeAll} from '../src/object'
import {spread} from '../src/array'


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
