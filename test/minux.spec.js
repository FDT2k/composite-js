import Minux from 'Minux'

import {createStore} from 'Minux'
import {applyMiddlewares} from 'Minux'
import {Task} from 'Monad';
import { identity } from 'core'

test ('minux',()=>{

    const reducer = (state,action)=>{
     //   expect(action).toEqual({type:'hello'} )
        return state;
    }
    let store = createStore(reducer,[]);

    store.dispatch({type:'hello'})
    expect(store.getState()).toEqual([])
})

test ('middleware',()=>{
    const reducer = (state,action)=>{
        return state;
    }


   let minux = applyMiddlewares([
       store => next => action => {
            next(action)
       },
       store => next => action => {
        next(action)
   }
   ])(createStore);

   let store = createStore(reducer,[])
   store.dispatch({type:'coucou'})
})


test('minux',()=>{
    const reducer = (state,action)=>{
        return state;
    }

    let store = Minux(reducer);

    expect(store.getState()).toBe(undefined)

    let reducer2 = (state=[],action)=>{
        return state;
    }
    let store2 = Minux(reducer2);
    expect(store2.getState()).toEqual([])

})



test('thunk',()=>{
    const reducer = (state,action)=>{
        console.log(action)
        return state;
    }

    let store = Minux(reducer);

    store.dispatch((store)=>{ store.dispatch({type:'thunk'})})


    
})
test('task',()=>{
    const reducer = (state={},action)=>{
        console.log(action)
        return state;
    }

    let store = Minux(reducer);

    store.dispatch(Task( (rej,res) => {
         res({type:'task'})
    }))

    store.dispatch(Task( (rej,res) => {
        rej({type:'failed_task'})
   }))

    const tc = store => Task((rej,res)=>{
        store.dispatch({type:'COMPLETED_TASK'});
        res({type:'TASK_CREATOR_SUCCESS'})
        rej({type:'TASK_CREATOR_FAILURE'})
    });
    
    store.dispatch({task:tc})
})