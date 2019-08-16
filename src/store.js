import {curry}  from './index'
export const store = (initialStore)=>{
  if(initialStore ){
    return initialStore
  }
  let data = {};
  return {
    getAll: ()=> data,
    get: (x)=>data[x],
    set: (x,y)=>{
      data[x]=y;
    },
    push: (x,y)=>{
      
    }
  }
}


/*
  Re-set a value in the store
*/
export const reset = key => val=> store =>{
  let _val = (typeof val === 'function') ? val(store) : val;
  let {set,get } = store;
  set(key,_val)
  return store
}

export const settor = reset;

export const getter = key => store =>{
  let{get} = store
  return get(key)
}

/*
  get a value, send to fn and return store
*/
export const gettor = key => fn => store=> {
  fn(gettor(key))
  return store;
}

/*
increment a value in the store
*/
export const increment = key => reset(key)(store=>(store.get(key)+1))
