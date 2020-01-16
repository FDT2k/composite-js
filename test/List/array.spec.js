import * as List from '../../src/List'
import  * as Find from '../../src/List/find'
import {identity} from '../../src/core'
import util from 'util'

test ('ensurecopy', ()=>{

  let list = [1,2,3];
  let list2 = List.ensureCopy(list)
  list2.push(4)
  expect(list).not.toEqual(list2)
  expect (list2).toEqual([1,2,3,4])

})



test ("safeSort", ()=>{

  expect(
    List.unsafeSort(undefined,[2,4,1])
  ).toEqual([1,2,4]);

  expect(
    List.safeSort(undefined,[2,4,1])
  ).toEqual([1,2,4]);

})

test ("groupListByKey",()=>{

  let list = require('./_datasample.js')

  let groupBy = List.reduceListByKeys(['insurer_code','tarif_name','age_range','franchise']);
  let res = groupBy(list)

  console.log(res)
})


test("join", ()=>{

  expect(
    List.join(',',[1,2,3])
  ).toBe('1,2,3')

  expect(
    List.join('-',[1,2,3])
  ).toBe('1-2-3')

})



/*
test("Sorting",()=>{
  let list =  ['a','f','g','b','f'];

  expect (
    c.sortByA(list)
  ).toEqual()
})
*/
