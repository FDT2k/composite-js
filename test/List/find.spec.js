import {findIndex,findIndexEqual} from '../../src/List/find'
import util from 'util'
test ("findIndex",()=>{
  expect (
    findIndex(item=> item =='bla')(['bla','foo','bar'])
  ).toBe(0)

  expect (
    findIndexEqual('bla')(['bla','foo','bar'])
  ).toBe(0)

  expect (
    findIndexEqual('bla')(['bla','foo','bar'])
  ).toBe(0)

  expect (
    findIndexEqual('foo')(['bla','foo','bar'])
  ).toBe(1)
});
