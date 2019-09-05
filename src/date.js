import {curry,compose,chain} from './core'
import {prop} from './object'
import {IO} from './functor'

export const ioDate = date => new IO (()=>new Date(date))

export const ioTimeStamp = x => IO.of(x.getTime()/1000)

export const timestamp = date=> compose(chain(ioTimeStamp),ioDate)(date).unsafePerformIO();

export const sortAsDate = timestamp

export const sortAsKeyDate = key=> compose (timestamp,prop(key))


/*let home_dir = safeDate.map(prop('homedir'))
console.log(home_dir.$value()())*/
