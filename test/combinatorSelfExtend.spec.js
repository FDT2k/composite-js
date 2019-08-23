import * as c from '../src/index'
import * as C from '../src/Combinator'
const {asFunctionProp:asF,asScalarProp:asS} = C;


const makeGetVariables= (variables)=>()=>{
  return variables
}

const append_vars = vars => combinator=> {
  return C.combineObject(
    combinator,
    asF('variables',c.compose(c.mergeAll,c.diverge(combinator().variables,vars)))
  )
}

const makeStore = ()=>{
  let store = []
  return (val)=>{
    store =  typeof(val)==='undefined' ? store : store.concat(val)
    return store
  }
}

const makeTaskStoreFN= log => store =>(task)=>(args)=>()=>{
  let {cwd,describe} = args;
  if ( typeof describe === 'undefined')
    describe = ()=>`undescribed action`

  if ( typeof cwd === 'undefined')
    log.warn('cwd has not been defined by the action creator, this can be catastrophic if the action is performing a task on a relative dir')

  log.info(describe())
  store({cmd:task, args})
}

const createContext =  variables =>(previousContext)=> {
  const group = C.makeCombineGroup(C.combineObject)
  let store = makeStore();
  let taskStore = makeTaskStoreFN(console)(store)

  return C.combineObject(
    asF('variables',makeGetVariables(variables)),
    asS('test','test')
  );
}


test ("extending Combinator ", ()=>{
  let context = createContext({'a':'a','b':'b'})();
  console.log(context())
  let newVars = ()=>({c:'c',d:'d'})

  let newcontext = append_vars(newVars)(context);
  console.log(newcontext().variables())
  console.log(newcontext())

})
