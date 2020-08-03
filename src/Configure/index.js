import {compose,is_undefined,is_type_function,
    trace,split,either,defaultTo,curry ,eitherThrow,
    is_array,identity,concat,map} from 'Core'

    import {reduce} from 'array'
import { prop , as_prop, keys,ensure_object_copy, assign2, enlist} from 'object';
import {spec,key} from 'Object'


export const servers_from_string =  split(',')



export const to_array_if_needed = fn =>  either(is_array,fn,identity)

// return the prop value or undefined
export const prop_value_or_undefined = (env_key,env) => compose(defaultTo,either(is_undefined,prop(env_key),x=>undefined))(env)

export const envThenValue = curry((defaultKey,defaultValue,ensureValue,env) => value=> compose(
    ensureValue,
    defaultTo(defaultValue),
    prop_value_or_undefined(defaultKey,env)
)(value));



export const field = curry((valueConfig,env,key) => compose(as_prop(key),valueConfig(env)));



export const reduceCalling = settings => (acc,item)=> {
    const k = key(item)
    const fn = item[k](k);
    const _v = settings[k]
    return {...acc,...fn(_v)};
}

export const applyValues = (settings) => reduce({},reduceCalling(settings))


/*
Object => Object=> Function => Object => Object
*/
export const aaa = (defaultSettings,settings)=> compose (applyValues(settings),enlist,spec(defaultSettings))


/**
 * Create a function that iterates over DefaultSettings
 */
export const makeConfig = defaultSettings=> (env)=> settings => {
    return aaa(defaultSettings,settings)(env)
}

// ensure that the passed parameter is a function or throw error

export const ensureFunction = msg=> eitherThrow(is_type_function,msg)
export {identity} from 'Core'