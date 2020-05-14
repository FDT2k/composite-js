import { curry,compose,identity } from 'core'


export const applyMiddlewares = curry((middlewares,createStore,reducer,...args)=>{
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

export const thunk = curry((store,next,action)=>{
    typeof action === 'function' ? action(store) : next(action)
})

export const task = curry((store,next,action)=>{
    typeof action !== 'undefined' &&  typeof action.fork !== 'undefined' && typeof action.fork ==='function' ? action.fork(next,next) : next(action)
})

export const taskCreator = curry((store,next,action)=>{
    typeof action.task !== 'undefined' && typeof action.task ==='function' ? action.task(store).fork(next,next) : next(action)
})


export const createStore = (reducer, initialState) => {

    let state = initialState;

    const getState = _ => state;

    const dispatch = action => {
        
        state = reducer(state, action)
        return state;
    }

    const store = {
        dispatch,
        getState,
    }
    dispatch({type:'_'});
    return store;
}


export default applyMiddlewares([thunk,task,taskCreator],createStore)