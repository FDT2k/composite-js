import * as c from '../src/index'
import util from 'util'
test ("groupListByKey",()=>{

  let list = [
		{
			"_id": "5d52845d81d15bd5a0b4f519",
			"accident": false,
			"age_range": "AKL-KIN",
			"age_subrange": "K1",
			"basef": "1",
			"basep": "0",
			"canton": "GE",
			"country": "CH",
			"franchise": "FRA-0",
			"franchise_class": "FRAST1",
			"insurer_code": "1384",
			"region_code": "PR-REG CH0",
			"tarif": "CASA",
			"tarif_type": "TAR-HAM",
			"year": "2019",
			"year_2": "2018",
			"__v": 0,
			"cost": 130.2,
			"tarif_name": "FAVORIT CASA",
			"id": "5d52845d81d15bd5a0b4f519"
		},
		{
			"_id": "5d52845d81d15bd5a0b4f51d",
			"accident": false,
			"age_range": "AKL-KIN",
			"age_subrange": "K3",
			"basef": "1",
			"basep": "0",
			"canton": "GE",
			"country": "CH",
			"franchise": "FRA-0",
			"franchise_class": "FRAST1",
			"insurer_code": "1384",
			"region_code": "PR-REG CH0",
			"tarif": "CASA",
			"tarif_type": "TAR-HAM",
			"year": "2019",
			"year_2": "2018",
			"__v": 0,
			"cost": 54.3,
			"tarif_name": "FAVORIT CASA",
			"id": "5d52845d81d15bd5a0b4f51d"
		},
		{
			"_id": "5d52845d81d15bd5a0b4f521",
			"accident": false,
			"age_range": "AKL-KIN",
			"age_subrange": "K1",
			"basef": "0",
			"basep": "0",
			"canton": "GE",
			"country": "CH",
			"franchise": "FRA-200",
			"franchise_class": "FRAST3",
			"insurer_code": "1384",
			"region_code": "PR-REG CH0",
			"tarif": "CASA",
			"tarif_type": "TAR-HAM",
			"year": "2019",
			"year_2": "2018",
			"__v": 0,
			"cost": 119.4,
			"tarif_name": "FAVORIT CASA",
			"id": "5d52845d81d15bd5a0b4f521"
		},
		{
			"_id": "5d52845d81d15bd5a0b4f525",
			"accident": false,
			"age_range": "AKL-KIN",
			"age_subrange": "K3",
			"basef": "0",
			"basep": "0",
			"canton": "GE",
			"country": "CH",
			"franchise": "FRA-200",
			"franchise_class": "FRAST3",
			"insurer_code": "1384",
			"region_code": "PR-REG CH0",
			"tarif": "CASA",
			"tarif_type": "TAR-HAM",
			"year": "2019",
			"year_2": "2018",
			"__v": 0,
			"cost": 43.5,
			"tarif_name": "FAVORIT CASA",
			"id": "5d52845d81d15bd5a0b4f525"
		},
	]

/*  let reduceBy = reducer => key => c.compose(c.trace_keys('x'),x=>({[key]:x}),c.reduce({},reducer))


//  console.log(list)
  let groupByGroup  = c.groupListByKey('insurer_code');
  let groupByModel  = c.groupListByKey('tarif_name');
  let groupByFranchise  = c.groupListByKey('franchise');

  let reduceByGroup = c.reduce({},groupByGroup)

  let reduceByModel = key =>  reduceBy(groupByModel)(key)
  let reduceByFranchise = key =>  reduceBy(groupByFranchise)(key)


  const divergeByKeys = fn=>obj=>  c.compose(c.mergeAll,c.map(x=>fn(x)(obj[x])))(Object.keys(obj))

//  let final = divergeByKeys(reduceByModel)(res)

  let composedGroupBy = c.compose (divergeByKeys(reduceByModel),reduceByGroup)
*/
//  console.log(res2,res3,res4)
  let groupBy = c.reduceListByKeys(['insurer_code','tarif_name','age_range','franchise']);
  let res = groupBy(list)
//  console.log(util.inspect(res,{ showHidden: true ,depth:5}))
})
