import {makeSort,sortAscending,sortDescending,sort_ci} from '../../src/List/sort'
import {identity} from '../../src/core'
test("Sorting",()=>{
  let list =  ['a','f','g','b','f'];

  expect (
    sortAscending(identity,list)
  ).toEqual( ["a", "b", "f", "f", "g"])

  expect (
    sortDescending(identity,list)
  ).toEqual(["g", "f", "f", "b", "a"]
)
})

test ("custom sorter", ()=>{
  const mySort =sort_ci
  let list =  ['Charles','Ann','Alice','alice'];

  expect (
    mySort(list)
  ).toEqual(["Alice", "alice", "Ann", "Charles"])

})
