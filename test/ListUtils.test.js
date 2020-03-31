import * as ListUtils from '../src/List'

import {curry,assign2} from '../src/index'

test ('equality',()=>{
  const test = {id:124,val:'test'}

  expect(
    ListUtils.propIsEqual('id',124,test)
  ).toBe(true)


  expect(
    ListUtils.propIsNotEqual('id',124,test)
  ).toBe(false)

  const IdNotEqual = ListUtils.propIsNotEqual('id');

  expect(
    IdNotEqual(124,test)
  ).toBe(false)

})

test ('delete from  list',()=>{
  let list = [
    {id:0,label:'world'},
    {id:1,label:'world'},
    {id:2,label:'world'},
    {id:3,label:'world',name:'blabla'},
    {id:4,label:'world'},
    {id:5,label:'world'}

  ]
  let expected = [
    {id:0,label:'world'},
    {id:2,label:'world'},
    {id:3,label:'world',name:'blabla'},
    {id:4,label:'world'},
    {id:5,label:'world'},

  ]
  let expected2 = [
    {id:0,label:'world'},
    {id:1,label:'world'},
    {id:2,label:'world'},
    {id:4,label:'world'},
    {id:5,label:'world'}

  ]
  expect(
    ListUtils.delByProp('id',list,1)
  ).toEqual(expected)
  expect(
    ListUtils.delByPropId(list,1)
  ).toEqual(expected)
  expect(
    ListUtils.delByProp('name')(list,'blabla')
  ).toEqual(expected2)

})



test ('get from  list',()=>{
  let list = [
    {id:0,label:'world'},
    {id:1,label:'world'},
    {id:2,label:'world'},
    {id:3,label:'world',name:'blabla'},
    {id:4,label:'world',name:'blabla'},
    {id:5,label:'world'}

  ]
  let expected = [
    {id:1,label:'world'},

  ]
  let expected2 = [
    {id:3,label:'world',name:'blabla'},
    {id:4,label:'world',name:'blabla'},
  ]
  expect(
    ListUtils.getByProp('id',list,1)
  ).toEqual(expected)
  expect(
    ListUtils.getByProp('name',list,'blabla')
  ).toEqual(expected2)

})





test ('update List ',()=>{
  let list = [
    {id:0,label:'world'},
    {id:1,label:'world'},
    {id:2,label:'world'},
    {id:3,label:'world',name:'blabla'},
    {id:4,label:'world',name:'blabla'},
    {id:5,label:'world'}

  ]

  let expected = [
    {id:0,label:'world'},
    {id:1,label:'world'},
    {id:2,label:'world'},
    {id:3,label:'world',name:'blablou'},
    {id:4,label:'world',name:'blabla'},
    {id:5,label:'world'}

  ]

  let expected_all = [
    {id:0,label:'world',name:'blablou'},
    {id:1,label:'world',name:'blablou'},
    {id:2,label:'world',name:'blablou'},
    {id:3,label:'world',name:'blablou'},
    {id:4,label:'world',name:'blablou'},
    {id:5,label:'world',name:'blablou'}

  ]

  let updater = x=> assign2(x,{name:'blablou'})


  expect(
    ListUtils.update(ListUtils.propIsEqual('id'),3,list,updater)
  ).toEqual(expected)
  expect(
    ListUtils.updateIfPropEqual('id',3,list,updater)
  ).toEqual(expected)

  expect(
    ListUtils.updateIfPropEqual('label','world',list,updater)
  ).toEqual(expected_all)
})
