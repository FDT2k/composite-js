
import * as c from '../src/index'
  import * as d from '../src/date'
  import {IO} from '../src/functor'
  import util from 'util'




  let date =  "2019-09-04T07:55:12.161Z"


  test ("findIndex",()=>{
    expect(
      !isNaN(d.timestamp('December 17, 1995 03:24:00'))
    ).toBe(true)
    expect(
      !isNaN(d.timestamp(date))
    ).toBe(true)

    expect(
      isNaN(d.timestamp('prout'))
    ).toBe(true)
  });
