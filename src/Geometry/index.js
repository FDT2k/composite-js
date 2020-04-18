import {curry,compose} from 'core'
import {prop} from 'object'

export const axisIntersects = curry((dimension,offset,length) => offset+length >0 && offset < dimension)


export const axisContains = curry((dimension,offset,length) => axisIntersects(dimension,offset,length) && offset >=0 && offset+length <= dimension)


export const X = prop('x');
export const Y = prop('y');
export const Width = prop('width');
export const Height = prop('height');

export const YDimension = (rect) => [Y(rect),Height(rect)]
export const XDimension = (rect) => [X(rect),Width(rect)]


// returns 0 if contained -1 if overlapping on left , 1 if overlapping on right
export const  NormalizedDirection = curry((dimension,offset,length) => axisContains(dimension,offset,length) ? 0 : offset+length <= dimension/2 ? -1 : 1 )

export const windowRect = (window) => ({x:0,y:0,width:window.innerWidth,height:window.innerHeight})


export const rectIntersectRect = curry((rectA,rectB) => axisIntersects(Width(rectA),...XDimension(rectB)) &&   axisIntersects(Height(rectA),...YDimension(rectB)))


export const rectContainsRect = curry((rectA,rectB) => axisContains(Width(rectA),...XDimension(rectB)) &&   axisContains(Height(rectA),...YDimension(rectB)))

//return a new offset depending on direction , assuming that the dimension is intersecting the other
export const constrainAxis = curry((dimension,offset,length) => {
    const normalizedDirection = NormalizedDirection(dimension,offset,length);

    return normalizedDirection !== 0 ? normalizedDirection == -1 ? 0 : dimension - (length) : offset;
})

export const constrainInRect = curry((rectA,rectB) => {
    if(!rectContainsRect(rectA,rectB)){
        return {
            ...rectB,
            x: constrainAxis(Width(rectA),...XDimension(rectB)),
            y: constrainAxis(Height(rectA),...YDimension(rectB)),
        }
    }
    return rectB
})