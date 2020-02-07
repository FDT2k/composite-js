import {findIndex,findIndexEqual,filterEqual,filterNotEqual} from '../../src/List/find'
import util from 'util'
test ("filter",()=>{

  expect (
    filterEqual('foo')(['bla','foo','bar'])
  ).toEqual(['foo'])

  expect (
    filterNotEqual('foo')(['bla','foo','bar','toto'])
  ).toEqual(['bla','bar','toto'])
  
});
