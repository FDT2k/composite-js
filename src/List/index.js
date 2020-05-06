import {curry,compose} from '../core'
import {filter,reduce,head} from '../array'
import {assign2} from '../object'
import {not} from '../bool'
import {either} from 'conditional'
import {map,identity} from '../core'


//makeMerge :: Number -> (Number, ([a]-> b)) -> ([a] -> b)
export const makeMerge = (arity) =>{
  return curryX(arity,(...args)=>{
    return reduce({},(a,b)=> merge(a,b),args)
  });
}

// mergeAll :: [{a},{b},{c}]-> {a,b,c,d}
export const mergeAll = list => reduce({},assign2,list)


export const delete_list_item = curry((state,action) => filter(item=> item.id !=action.payload,state));

export const add_list_item = curry((state,action)=> [...state,action.payload]);

export const item_prop_is_equal = curry((prop,value,item)=>item[prop]==value);

export const add_to_list = curry((state,action)=> [...state,action.payload]);

// del_from_list :: List -> Object-> List
export const del_from_list_by_prop_id = curry((state,action) => filter(item=> item.id !=action.payload,state));

// update_object :: Object->Object->Object
export const update_object = assign2

// update_list_by_prop_id :: List -> a -> Fn -> List
export const update_list_by_prop_id = curry((list,itemIdValue,updateFn)=> update_list(list,item_prop_is_equal('id',itemIdValue),updateFn))

// update_list :: List -> Fn -> Fn -> List
export const update_list = curry((list,itemPredicate, updateFn)=> list.map(item=>either(itemPredicate,identity,updateFn,item)))




export const propIsEqual = curry( (prop,value,item)=> item[prop]===value );
export const propIsNotEqual = curry( (prop,value,item)=> item[prop]!==value );

export const delByProp = curry ( (prop,list,val)=> filter(propIsNotEqual(prop,val),list))
export const delByPropId = delByProp('id')

export const add = curry((list,item)=> [...list,item]);

export const getByProp = curry((prop,list,val)=> filter(propIsEqual(prop,val),list))




export const update = curry((cond,val,list,fn) => map(either(cond(val),identity,fn))(list))

export const updateIfPropEqual =curry((prop,val,list,fn) => update(propIsEqual(prop),val,list,fn)  )
