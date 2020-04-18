import * as Geo from '../src/Geometry'

import {identity} from 'core'


test('lines',()=>{
   
   

    expect(
        Geo.axisIntersects(1000,300,200)
    ).toBe(true)

    expect(
        Geo.axisIntersects(100,200,1000)
    ).toBe(false)

    expect(
        Geo.axisIntersects(200,-500,50)
    ).toBe(false)
    expect(
        Geo.axisIntersects(200,-150,50)
    ).toBe(false)
    expect(
        Geo.axisIntersects(200,-100,100)
    ).toBe(false)
    expect(
        Geo.axisIntersects(200,-100,101)
    ).toBe(true)


    expect(
        Geo.axisContains(200,0,10)
    ).toBe(true)

    expect(
        Geo.axisContains(200,100,10)
    ).toBe(true)


    expect(
        Geo.axisContains(200,100,100)
    ).toBe(true)

    expect(
        Geo.axisContains(200,100,101)
    ).toBe(false)

    expect(
        Geo.axisContains(200,-1,101)
    ).toBe(false)



    
});


test ("rect",()=>{

    const rect ={
        x:10,
        y:20,
        width:100,
        height:200,
    }

    expect(
        Geo.YDimension(rect)
    ).toEqual(
        [20,200]
    )
    expect(
        Geo.XDimension(rect)
    ).toEqual(
        [10,100]
    )
})

test ("Rect intersect",()=>{

    const window = {
        width: 200,
        height:300
    }

    const rect ={
        x:10,
        y:20,
        width:100,
        height:200,
    }

   

    expect(
       Geo.rectIntersectRect(window,rect)
    ).toBe(
        true
    )

})

test ("Rect intersect",()=>{

    const window = {
        width: 200,
        height:300
    }

    const rect ={
        x:-10,
        y:20,
        width:100,
        height:200,
    }

   

    expect(
       Geo.rectIntersectRect(window,rect)
    ).toBe(
        true
    )

})

test ("Rect intersect",()=>{

    const window = {
        width: 200,
        height:300
    }

    const rect ={
        x:199,
        y:199,
        width:100,
        height:200,
    }

   

    expect(
       Geo.rectIntersectRect(window,rect)
    ).toBe(
        true
    )

})

test ("Rect not intersect",()=>{

    const window = {
        width: 200,
        height:300
    }

    const rect ={
        x:200,
        y:200,
        width:100,
        height:200,
    }

   

    expect(
       Geo.rectIntersectRect(window,rect)
    ).toBe(
        false
    )

})

test ("Rect fully contained",()=>{

    const window = {
        width: 800,
        height:600
    }

    const rect ={
        x:200,
        y:200,
        width:100,
        height:200,
    }

   

    expect(
       Geo.rectContainsRect(window,rect)
    ).toBe(
        true
    )

})

test ("Rect fully contained",()=>{

    const window = {
        width: 800,
        height:600
    }

    const rect ={
        x:400,
        y:200,
        width:200,
        height:200,
    }

   

    expect(
       Geo.rectContainsRect(window,rect)
    ).toBe(
        true
    )

})

test ("Rect not contained but intersecting",()=>{

    const window = {
        width: 800,
        height:600
    }

    const rect ={
        x:600,
        y:200,
        width:201,
        height:200,
    }

    expect(
       Geo.rectContainsRect(window,rect)
    ).toBe(
        false
    )
    expect(
        Geo.rectIntersectRect(window,rect)
     ).toBe(
        true
     )
})


test ("Rect Constraining 1", ()=>{
    const window = {
        width: 800,
        height:600
    }

    const rect ={
        x:600,
        y:200,
        width:201,
        height:200,
    }

    const rect2 ={
        x:700,
        y:500,
        width:200,
        height:200,
    }
/*
    let res = Geo.constrainInRect(window,rect)
    console.log(res)
    res = Geo.constrainInRect(window,rect2)
    console.log(res)
*/
    expect (
        Geo.constrainInRect(window,rect)
    ).toEqual(
        {"height": 200, "width": 201, "x": 599, "y": 200}
    )

    expect (
        Geo.constrainInRect(window,rect2)
    ).toEqual(
        {"height": 200, "width": 200, "x": 600, "y": 400}
    )
})


test ("Rect Constraining 2", ()=>{
    const window = {
        width: 800,
        height:600
    }

    const rect ={
        x:0,
        y:0,
        width:300,
        height:200,
    }

    const rect2 ={
        x:555,
        y:200,
        width:300,
        height:200,
    }


    expect (
        Geo.constrainInRect(window,rect)
    ).toEqual(
        {"height": 200, "width": 300, "x": 0, "y": 0}
    )

    expect(
        Geo.constrainInRect(window,rect2)
    ).toEqual(
        {"height": 200, "width": 300, "x": 500, "y": 200}
    )

})


test ("Rect Constraining on left or top", ()=>{
    const window = {
        width: 800,
        height:600
    }

    const rect ={
        x:0,
        y:0,
        width:300,
        height:200,
    }

    const rect2 ={
        x:-20,
        y:200,
        width:300,
        height:200,
    }


    const rect3 ={
        x:-20,
        y:-200,
        width:300,
        height:200,
    }

    expect (
        Geo.constrainInRect(window,rect)
    ).toEqual(
        {"height": 200, "width": 300, "x": 0, "y": 0}
    )

    expect(
        Geo.constrainInRect(window,rect2)
    ).toEqual(
        {"height": 200, "width": 300, "x": 0, "y": 200}
    )
    expect(
        Geo.constrainInRect(window,rect3)
    ).toEqual(
        {"height": 200, "width": 300, "x": 0, "y": 0}
    )

})