import { curry,compose,identity } from 'core'

/* Function is adapted from Redux 4 

List => createStore => Reducer => Store
*/
export const applyMiddlewares = curry((middlewares,createStore)=>(reducer,...args)=>{
    let dispatch = identity

    const store = createStore(reducer, ...args)
    const middlewareAPI = {
        getState: store.getState,
        dispatch: (action, ...args) => dispatch(action, ...args)
      }
    
    const chain = middlewares.map(middleware => middleware(middlewareAPI))

    dispatch = compose(...chain)(store.dispatch)

    return {
        ...store,
        dispatch
      }
})

export const thunk = curry((store,next,action)=>typeof action === 'function' ? action(store) : next(action))

export const task = curry((store,next,action)=>typeof action !== 'undefined' &&  typeof action.fork !== 'undefined' && typeof action.fork ==='function' ? action.fork(next,next) : next(action))

export const taskCreator = curry((store,next,action)=>typeof action.task !== 'undefined' && typeof action.task ==='function' ? action.task(store).fork(next,next) : next(action))


export const logger = curry((store,next,action)=>{
    console.log('[MINUX_LOGGER]:',action);
    next(action)
})


export const createStore = (reducer, initialState) => {

    let state = initialState;

    const getState = _ => state;
    let listeners = [];


    const dispatch = action => {
        
        state = reducer(state, action);

        for (let i = 0 ; i < listeners.length;i++){
            listeners[i]()
        }
        return action;
    }

    const subscribe = listener => {
        listeners.push(listener);

        return _=> {
            const index = listeners.indexOf(listener)
            listeners.splice(index, 1)
        }
    }

    const store = {
        dispatch,
        getState,
        subscribe
    }
    dispatch({type:'-_-'});
    return store;
}


export const observeStore = (select=identity,store, onChange)  => {
    let currentState;
  
    function handleChange() {
      let nextState = select(store.getState());
      if (nextState !== currentState) {
        onChange(currentState,nextState);

        currentState = nextState;
      }
    }
  
    let unsubscribe = store.subscribe(handleChange);
    handleChange();
    return unsubscribe;
  }

export default applyMiddlewares([thunk,task,taskCreator],createStore)