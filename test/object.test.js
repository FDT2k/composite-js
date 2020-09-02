import {merge,makeMerge,mergeAll,spec,omit_key,omit_keys,filter_keys} from 'object'
import {spread} from 'array'

import {curry} from '../src/core'

/*
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
*/
test("omit_key",()=>{
  let mykesy = {
    a:0,
    b:1,
    c:3
  }

  expect(omit_key('a',mykesy)).toEqual({b:1,c:3})


})

test("omit_keys",()=>{
  let mykesy = {
    a:0,
    b:1,
    c:3
  }

  expect(omit_keys(['a','b'],mykesy)).toEqual({c:3})


})


test("filter_keys",()=>{
  let obj = {
    id:'a',
    crap:'nasdg',
    valuable:[],
    anothercrap:{}
  }

  
  let keeps = keys=> key => {
    return keys.indexOf(key) !==-1
  }
  

  let omit = keys => key => {
    return keys.indexOf(key) === -1;
  }


  let keepfilter = keeps (['id','valuable']);
  let omitfilter = omit (['id','valuable']);

  expect(filter_keys(keepfilter,obj) ).toEqual({"id": "a", "valuable": []})


  expect(filter_keys(omitfilter,obj) ).toEqual({"anothercrap": {}, "crap": "nasdg"})



})
/*
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
*/