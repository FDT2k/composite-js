import * as ReactUtils from '../src/ReactUtils'

import {identity} from 'core'


test('Rectangle',()=>{
    const props = {
        className: '',
        toolbarClassName:'',
        blop:false,
        handleClick:'click',
        toolbarHandle:'sadbs',
        tollbarClassname:'ahi'
    }    

    expect(
        ReactUtils.spreadObjectBeginWith('className',props)
    ).toEqual(
        [{"className": ""}, 
        
        {"blop": false, "handleClick": "click", "tollbarClassname": "ahi", "toolbarClassName": "", "toolbarHandle": "sadbs"}]

    );

    expect(
        ReactUtils.spreadObjectEndingWith('ClassName',props)
    ).toEqual(
        [
            {"toolbarClassName": ""}, 
        {"blop": false, "className": "", "handleClick": "click", "tollbarClassname": "ahi", "toolbarHandle": "sadbs"}]
    );


    expect(
        ReactUtils.spreadObjectContaining('toolbarHandle',props)
    ).toEqual(
        [{"toolbarHandle": "sadbs"}, 
        {"blop": false, "className": "", "handleClick": "click", "tollbarClassname": "ahi", "toolbarClassName": ""}]
    ); 
    
    expect(
        ReactUtils.spreadObjectContaining('toolbar',props)
    ).toEqual(
        [{"toolbarClassName": "", "toolbarHandle": "sadbs"},
         {"blop": false, "className": "", "handleClick": "click", "tollbarClassname": "ahi"}]

    );


    const [a,b] =ReactUtils.spreadObjectContaining('toolbar',props)

    expect(
        ReactUtils.forwardPropsRemovingHeader('toolbar',a)
    ).toEqual(
        {"className": "", "handle": "sadbs"}

    );
    expect(
        ReactUtils.forwardPropsRemovingHeader('toolbar',a)
    ).toEqual(
        {"className": "", "handle": "sadbs"}

    );

  });



  test('PresentIn',()=>{
    const props = {
        className: '',
        contained:'',
        cover:false,
        center:'click',
        toolbarHandle:'sadbs',
        tollbarClassname:'ahi'
    }    

    expect(
        ReactUtils.spreadObjectPresentIn(['contained','cover'],props)
    ).toEqual( [
        {"contained": "", "cover": false},
        {"center": "click", "className": "", "tollbarClassname": "ahi", "toolbarHandle": "sadbs"}
    ]);

  });





test('real world',()=>{
    console.log('test 2 -------------')
    const testprops = {
        inputHandleChange:identity,
        inputValue : '',
        inputHandleSubmit: identity
    }    
    console.log(testprops)

    const [filtered,rest ] = ReactUtils.spreadObjectBeginWith('input',testprops)
    console.log(filtered)
    console.log(rest)
  });

