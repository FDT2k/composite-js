import { curry } from 'core'



export default curry((reducer, initialState) => {

    let state = initialState;

    const getState = _ => state;

    const dispatch = action => {
        state = reducer(state, action)
        return state;
    }

    const thunk = action => {
        return action(dispatch, getState)
    }

    return ({
        dispatch,
        getState,
        thunk
    })
})
