import * as c from '../src/index'
import util from 'util'
test ("groupListByKey",()=>{

  let list = require('./_datasample.js')

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
