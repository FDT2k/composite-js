import * as c from '../src/index'
import util from 'util'
test ("findIndex",()=>{
  expect (
    c.findIndex(item=> item =='bla')(['bla','foo','bar'])
  ).toBe(0)

  expect (
    c.findIndexEqual('bla')(['bla','foo','bar'])
  ).toBe(0)
  expect (
    c.findIndexEqual('bla')(['bla','foo','bar'])
  ).toBe(0)

  expect (
    c.findIndexEqual('foo')(['bla','foo','bar'])
  ).toBe(1)


  expect (
    c.filterEqual('foo')(['bla','foo','bar'])
  ).toEqual(['foo'])
  expect (
    c.filterNotEqual('foo')(['bla','foo','bar','toto'])
  ).toEqual(['bla','bar','toto'])
});
