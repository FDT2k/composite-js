
import {compose,as_prop,prop,curry,spread,diverge,identity} from '../src/index.js'
import {divergeRightThen,divergeLeftThen} from '../src/deprecated'
import {merge} from '../src/object'
import {lcase,ucase} from '../src/string'

test ('[diverge] shortcuts',()=>{

  let upperkey = key => compose(as_prop(key),ucase,prop(key))

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
  let fuuuusion = divergeRightThen(spread(merge))
  let upper_some_keys = fuuuusion(upperkey('a'),upperkey('c'))
  let gogeta =  fuuuusion(identity,upper_some_keys)
  expect(
    gogeta(object)
  ).toEqual({a:'A',c:'C',b:'b',d:'d'})


  let vegeta = {
    a:'final flash'
  }

  let sangoku = {
    c: 'kamehameha'
  }

  expect(
    gogeta({...vegeta,...sangoku})
  ).toEqual({a:'FINAL FLASH', c:'KAMEHAMEHA'})


})
