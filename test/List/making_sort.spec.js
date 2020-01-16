
import * as c from '../../src/index'
import * as d from '../../src/date'
import util from 'util'


let to_sort = require('./sample.js')

let to_sort_date= ['1999-01-01','2019-02-23','1993-05-18']
let to_sort_string = ['c','e','i','a','B','g']

test ("findIndex",()=>{
  c.sort((a,b)=>{return a-b })(tosort)

  //  let predicate = transformValue => key => (a,b) => transform(a[key])-transform(b[key])

  const sortByWhen = d.sortAsKeyDate('when')
  const sortBySize = c.sortAsKeyCaseInsensitive('size')
  const sortCI = c.sortAsCaseInsensitive

  let sortedAscBySizeCI=c.sortBy(sortBySize)(tosort)
  let sortedDescBySizeCI=c.sortByD(sortBySize)(tosort)

  let sortedByWhenDesc = c.sortByD(sortByWhen)(tosort)
  let sortedByWhenAsc = c.sortByA(sortByWhen)(tosort)

  let sortedAscCI=c.sortByA(sortCI)(to_sort_string)
  let sortedDescCI=c.sortByD(sortCI)(to_sort_string)

  let sortedAscDate = c.sortByA(d.sortAsDate)(to_sort_date)
  let sortedDescDate = c.sortByD(d.sortAsDate)(to_sort_date)

  expect (
    c.reverse(sortedAscCI)
  ).toEqual(sortedDescCI)

  expect (
    c.reverse(sortedAscBySizeCI)
  ).toEqual(sortedDescBySizeCI)

  expect (
    c.reverse(sortedByWhenAsc)
  ).toEqual(sortedByWhenDesc)

  expect (
    c.reverse(sortedAscDate)
  ).toEqual(sortedDescDate)

});
