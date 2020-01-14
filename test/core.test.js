import {compose,pipe,curry,identity,diverge,flip,divergeRightThen} from '../src/index'
import {prop,as_prop,merge} from '../src/object'
import {spread} from '../src/array'
const upperCase = x=>x.toUpperCase()
const lowerCase = x=>x.toLowerCase()

test('[Compose] calling compose without parameter should return args', () => {
  const result = compose()
  expect(result('hello')).toBe('hello')
  expect(result('hello','world')).toBe('hello')

});

test('[Compose] calling compose with 1 parmaeter should return function', () => {
  const result = compose(x=>x.toUpperCase())
  expect(result('hello')).toBe('HELLO')
});


test('[Compose] compose should work', () => {
  expect(
    compose(x=>x.toUpperCase(),x=>x.toLowerCase()) ('hello')
  ).toBe('HELLO')

  expect(
    compose(x=>x.toLowerCase(),x=>x.toUpperCase()) ('hello')
  ).toBe('hello')
});


test('[Pipe] calling pipe without parameter should return args', () => {
  const result = pipe()
  expect(result('hello')).toBe('hello')
  expect(result('hello','world')).toBe('hello')

});

test('[Pipe] calling pipe with 1 parmaeter should return function', () => {
  const result = pipe(x=>x.toUpperCase())
  expect(result('hello')).toBe('HELLO')
});



test('[Pipe] should work', () => {

  expect(
    pipe(lowerCase,upperCase)('HeLlO')
  ).toBe('HELLO')

  expect(
    pipe(lowerCase,upperCase,lowerCase)('HeLlO')
  ).toBe('hello')
});


test('[curry] should work', () => {
  let fn = (a,b,c) => {
    return a+b+c;
  }

  let curried = curry(fn)


  expect(
    curried
  ).toBeInstanceOf(Function)

  expect(
    curried(1)
  ).toBeInstanceOf(Function)

  expect(
    curried(1)(2)
  ).toBeInstanceOf(Function)

  expect(
    curried(1)(2)(3)
  ).toBe(6)

  expect(
    curried(1,2)
  ).toBeInstanceOf(Function)
  expect(
    curried(1,2,3)
  ).toBe(6)


});

test ('[identity] ',()=>{
  expect(
    identity('abcd')
  ).toBe('abcd')
})


test ('[diverge]',()=>{
  let up_and_low = diverge(upperCase,lowerCase)
  expect(
    up_and_low('hello')
  ).toEqual(['HELLO','hello'])

  expect(
    compose(up_and_low)('hello')
  ).toEqual(['HELLO','hello'])

  expect(
    pipe(up_and_low)('hello')
  ).toEqual(['HELLO','hello'])

  let upperkey = key => compose(as_prop(key),upperCase,prop(key))

  let object = {
    a:'a',
    b:'b',
    c:'c',
    d:'d'
  }

  expect(
    upperkey('a')(object)
  ).toEqual({a:'A'})

  // we want to upper key a && c

  let upper_a_c = compose(spread(merge),diverge(upperkey('a'),upperkey('c')))
  let full = compose(spread(merge),diverge(identity,upper_a_c))
  expect(
    full(object)
  ).toEqual({a:'A',c:'C',b:'b',d:'d'})

})
