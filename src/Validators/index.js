import {defaultTo,isStrictlyEqual} from 'bool'
import {test} from 'string'
import {compose} from 'core'

//export const isEmptyString = value => defaultTo('')(value) === ''
export const isEmail = compose(test(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),defaultTo(''));


export const isEmptyString = compose(isStrictlyEqual(''),defaultTo(''))
