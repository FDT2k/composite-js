import {defaultTo,compose} from './bool'

// resolveTilde :: String -> String
export const resolveTilde = (path)=>{

  // '~/folder/path' or '~'
  if (path[0] === '~' && (path[1] === '/' || path.length === 1)) {
    return path.replace('~', os.homedir());
  }
  return path;
}
