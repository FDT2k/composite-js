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

test ('subscribe',(done)=>{
    const reducer = (state={},action)=>{
        console.log(action)
        return state;
    }

    let store = Minux(reducer);

    store.subscribe(_=>{
        console.log('listener',store.getState())
        done();
    })

    store.dispatch({type:'task'})




})


test ('subscribe multiple',(done)=>{
    const reducer = (state={},action)=>{
        console.log(action)
        return state;
    }

    let store = Minux(reducer);

    let done1= false;

    store.subscribe(_=>{
        console.log('listener1',store.getState())
        if (done1) {
            done()
         }else {
            done1= true
         }
    })


    store.subscribe(_=>{
        console.log('listener2',store.getState())
        if (done1) {
            done()
         }else {
            done1= true
         }
    })

    store.dispatch({type:'task'})




})



test ('subscribe/unsubscribe',(done)=>{
    const reducer = (state={},action)=>{
        console.log(action)
        return state;
    }

    let store = Minux(reducer);

    let done1= false;

    const unsub = store.subscribe(_=>{
        console.log('listener1',store.getState())
        throw new Error('coucou')
    })

    unsub();

    store.subscribe(_=>{
        console.log('listener2',store.getState())
       done();
    })

    store.dispatch({type:'task'})

    



})