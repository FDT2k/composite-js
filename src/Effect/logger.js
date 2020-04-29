import {combineObject, asFunctionProp} from 'Combinator'
import{compose} from 'core'

import {safePropCall} from 'deprecated'
import chalk from 'chalk'

const safeConsoleLog =  x => console.log(x)
const safeChalk = safePropCall (chalk)

const colorize = color => safeChalk(color)
//const colorLog = color =>  c.compose(safeConsoleLog,safeChalk(color));
const logTask = compose(colorize('bgGreen'),colorize('black'));
const skipTask = compose(colorize('bgRed'),colorize('yellow'));
const erroredTask = compose(colorize('bgRed'),colorize('black'));
let combine = combineObject;
const callStackColor = compose (colorize('bgBlack'),colorize('grey'));

let combinedColorizer= combine(
    asFunctionProp('error',colorize('red')),
    asFunctionProp('warn',colorize('yellow')),
    asFunctionProp('log',colorize('green')),
    asFunctionProp('info',colorize('grey')),
    asFunctionProp('task',logTask),
    asFunctionProp('skippedTask',skipTask),
    asFunctionProp('critical',erroredTask),
    asFunctionProp('subLog',compose (colorize('bgBlack'),colorize('yellow'))),
    asFunctionProp('actLog',compose (colorize('bgBlack'),colorize('green'))),
    asFunctionProp('trace',compose (colorize('yellow')))
)


const logEnhancer = fn => (...args) => {
	return safeConsoleLog(
		fn(...args.map(arg=>{
			const is_error = arg instanceof Error
			if(!is_error){
				switch (typeof(arg)){

					case 'object':
						return `Object - keys:[${Object.keys(arg)}]`

					break;
					default : return arg;
				}
			}else{
				return `\n${arg} ${callStackColor(arg.stack)}`
			}

		}))
	)


}


const logify = arg=>{
  const is_error = arg instanceof Error
  if(!is_error){
    switch (typeof(arg)){
      case 'object':
        return `Object - keys:[${Object.keys(arg)}]`
      break;
      default : return arg;
    }
  }else{
    return `\n${arg} ${callStackColor(arg.stack)}`
  }

}

const processLog = (...args)=>{
  return [
    ...args.map(logify)
  ]
}

const logEnhancerDetails = fn => (...args) => {
	return safeConsoleLog(
		fn(processLog(args))
	)
}


export const logger= combinedColorizer(logEnhancer)
export const superLogger = combinedColorizer(logEnhancerDetails)
