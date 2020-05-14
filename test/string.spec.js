import {camelToSnakeCase,snakeToUpperCamelCase,snakeToLowerCamelCase,matchRule}  from 'StringUtils'

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


test ("matchRule",()=>{
    expect(matchRule('test.*','test.what')).toBe(true)
    expect(matchRule('test.*','test.asdg')).toBe(true)
    expect(matchRule('*test.*','test.asdg')).toBe(true)
    expect(matchRule('*_test.*','12_test.asdg')).toBe(true)
    expect(matchRule('test.*','tesst.asdg')).toBe(false)
});