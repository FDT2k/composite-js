import * as ReactUtils from '../src/ReactUtils'




test('propThatMatch',()=>{
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
        [{"className": ""}, {"blop": false, "handleClick": "click", "tollbarClassname": "ahi", "toolbarClassName": "", "toolbarHandle": "sadbs"}]

    );

    expect(
        ReactUtils.spreadObjectEndingWith('ClassName',props)
    ).toEqual(
        [{"toolbarClassName": ""}, {"blop": false, "className": "", "handleClick": "click", "tollbarClassname": "ahi", "toolbarHandle": "sadbs"}]
    );


    expect(
        ReactUtils.spreadObjectContaining('toolbarHandle',props)
    ).toEqual(
        [{"toolbarHandle": "sadbs"}, {"blop": false, "className": "", "handleClick": "click", "tollbarClassname": "ahi", "toolbarClassName": ""}]
    ); 
    
    expect(
        ReactUtils.spreadObjectContaining('toolbar',props)
    ).toEqual(
        [{"toolbarClassName": "", "toolbarHandle": "sadbs"}, {"blop": false, "className": "", "handleClick": "click", "tollbarClassname": "ahi"}]

    );


    const [a,b] =ReactUtils.spreadObjectContaining('toolbar',props)

    expect(
        ReactUtils.forwardPropsRemovingHeader('toolbar',a)
    ).toEqual(
        {"className": "", "handle": "sadbs"}

    );

  });

