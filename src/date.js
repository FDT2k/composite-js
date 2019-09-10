import {curry,compose,chain,map,identity} from './core'
import {prop} from './object'
import {defaultTo} from './bool'
import {IO,Maybe} from './functor'
import {trace} from './debug'


// Date -> IO
export const _ioDate = date => new IO (()=>new Date(date))

export const ioDate = compose(_ioDate,defaultTo(null))

// IO -> IO
export const ioTimeStamp = x => IO.of(x.getTime())

//String -> IO
export const safeTimestamp = compose(chain(ioTimeStamp),ioDate)

// String -> Timestamp
export const timestamp = date=> safeTimestamp(date).unsafePerformIO();

// String -> Timestamp
export const sortAsDate = timestamp

export const sortAsKeyDate = key=> compose (timestamp,prop(key))
