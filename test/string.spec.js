import {camelToSnakeCase,snakeToUpperCamelCase,snakeToLowerCamelCase}  from 'StringUtils'

test ("camelToSnakeCase",()=>{
    expect(camelToSnakeCase('toRight')).toBe('to_right')
    expect(camelToSnakeCase('Toright')).toBe('toright')
    expect(camelToSnakeCase('ToRight')).toBe('to_right')
});

test ("snakeToCamelCase",()=>{
    expect(snakeToUpperCamelCase('to_right')).toBe('ToRight')
    expect(snakeToLowerCamelCase('to_right')).toBe('toRight')
    expect(snakeToLowerCamelCase('_to_right')).toBe('ToRight')
});