import { curry, identity } from 'core'
import { is_undefined } from 'bool'
// very small either, no way to know if there was an error
/*
  if(cond is met, return right else return left)
*/
export const either = curry((cond, left, right, val) => {
    return cond(val) ? right(val) : left(val);
})

export const eitherUndefined = either(is_undefined)

export const _throw = x => val => { throw new Error(x) }

//interrupt everything
export const eitherThrow = curry((cond, error) => either(cond, _throw(error), identity))

export const tryCatcher = curry((catcher, tryer, arg) => {
    try {
        return tryer(arg)
    } catch (err) {
        return catcher(arg, err);
    }
})
