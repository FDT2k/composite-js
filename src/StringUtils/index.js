import {identity,compose,map} from 'core'
import {either} from 'conditional'
import {joinList,reduce} from'array';
import {isCapitalLetter,split,ucfirst,lcfirst,concat,lcase,ucase} from 'string'

const toSnake =  either(isCapitalLetter, identity,compose(concat('_'),lcase))


const snakeReducer = (acc,item,idx) => {
    const letter =  either(
        _=> idx ===0,
        toSnake,
        lcase
    )(item)
    acc.push(letter)
    return acc;
}


export const camelMapper = (item,idx)=> either(_=>idx ===0 , ucfirst,identity)(item)

export const camelToSnakeCase = compose (joinList(''),x=>reduce([],snakeReducer,x),split(''))
export const snakeToCamelCase = compose(joinList(''),map(camelMapper),split('_'))
export const snakeToUpperCamelCase = compose (snakeToCamelCase,ucfirst);
export const snakeToLowerCamelCase = compose (snakeToCamelCase,lcfirst);


