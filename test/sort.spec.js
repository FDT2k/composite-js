
import * as c from '../src/index'
  import * as d from '../src/date'
  import util from 'util'

  let tosort = [
  	{
  		"product_id": "ETH-BTC",
  		"what": "sell",
  		"price": "0.01687000",
  		"price_in": "BTC",
  		"when": "2019-09-04T07:55:12.161Z",
  		"size": "1.16659017",
  		"src": "ETH",
  		"dst": "BTC"
  	},
  	{
  		"product_id": "ETH-BTC",
  		"what": "buy",
  		"price": "0.01686000",
  		"price_in": "BTC",
  		"when": "2019-09-04T07:55:36.673Z",
  		"size": "0.56285013",
  		"src": "BTC",
  		"dst": "ETH"
  	},
  	{
  		"product_id": "ETH-BTC",
  		"what": "buy",
  		"price": "0.01686000",
  		"price_in": "BTC",
  		"when": "2019-09-04T07:55:55.266Z",
  		"size": "0.01000000",
  		"src": "BTC",
  		"dst": "ETH"
  	},
  	{
  		"product_id": "ETH-BTC",
  		"what": "buy",
  		"price": "0.01686000",
  		"price_in": "BTC",
  		"when": "2019-09-04T07:55:55.267Z",
  		"size": "6.97660236",
  		"src": "BTC",
  		"dst": "ETH"
  	},
  	{
  		"product_id": "ETH-BTC",
  		"what": "buy",
  		"price": "0.01685000",
  		"price_in": "BTC",
  		"when": "2019-09-04T07:57:05.789Z",
  		"size": "0.25901480",
  		"src": "BTC",
  		"dst": "ETH"
  	}]

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
