import * as ObjectUtils from '../src/Object'

import {curry,compose} from '../src/index'
import {test as _test} from '../src/string'
import {not} from '../src/bool'



test('propThatMatch',()=>{

  const beginWithToolbar = ObjectUtils.propMatch(/^Toolbar/);
  const keyBeginWithToolbar = beginWithToolbar('key');
  expect(
      keyBeginWithToolbar({key:'ToolbarHandleProut'})
      
  ).toBe(true)
  expect(
    keyBeginWithToolbar({key:'andleProut'})
    
).toBe(false)


  });


test('rest',()=>{

  let o = {
    toolbarHandleBack: 'aaa',
    toolbarHandleForward: 'bbb',
    handleProp: 'ccc',

  }
  const beginWithToolbar = _test(/^toolbar/);

  expect(
    beginWithToolbar('basdb')
    ).toBe(false)

    expect(
      beginWithToolbar('toolbarHandleForward')
      ).toBe(true)
  
  
  const filter = ObjectUtils.filterByKey(beginWithToolbar)
  expect(
    filter(o)
    ).toEqual({"toolbarHandleBack": "aaa", "toolbarHandleForward": "bbb"})



  const filternot = ObjectUtils.filterByKey(compose(not,beginWithToolbar))

  expect(
    filternot(o)
    ).toEqual({"handleProp": "ccc"})
  
  
  const easySpread = ObjectUtils.spreadFilterByKey(beginWithToolbar)

  expect(
    easySpread(o)
    ).toEqual([{"toolbarHandleBack": "aaa", "toolbarHandleForward": "bbb"}, {"handleProp": "ccc"}])


  
  const [{toolbarHandleBack,toolbarHandleForward,handleProp},rest] = ObjectUtils.spreadFilterByKey(beginWithToolbar) (o);

  expect (toolbarHandleBack).toBe('aaa')
  expect (toolbarHandleForward).toBe('bbb')
  expect (rest).toEqual({"handleProp": "ccc"})



});