import * as C from '../src/chain'
import * as F from '../src/functor'
import {Task,MakeTask} from 'Monad'
import {pipe,compose,chain,map} from '../src/core'

const makeTask  = output => MakeTask ((reject,resolve)=>{ resolve(output) })
const makeFailTask  = output => MakeTask ((reject,resolve)=>{ reject(`fail ${output}`) })

const makeTaskPromise  = output => MakeTask ((reject,resolve)=>{ output.then(resolve) })


test ("1 in chain",(done)=>{
  let t1 =  makeTask('1');
  const collector = C.make_task_collector()
  let task_set = C.collect_chain(collector)
  const resultFn = task_set(t1)
  resultFn().fork(
    console.error,
    _=>{
      expect(_.length).toBe(1);

      expect(_).toEqual(['1'])

      done();
    }
  )

});





test ("Type",(done)=>{


  let t1 =  makeTask('1');
  let t2 =  makeTask('2');
  let t3 =  makeTask('3');
  let t4 =  makeTask('4');


  const collector = C.make_task_collector()

  let task_set = C.collect_chain(collector)


  const resultFn = task_set(t1,t2,t3,t4)

  resultFn().fork(
    console.error,
    _=>{
      expect(_.length).toBe(4);

      expect(_).toEqual(['1','2','3','4'])

      done();
    }
  )

});



test ("manual chain task",(done)=>{


  let t1 = makeTask('1');
  let t2 = makeTask('2');
  let t3 = makeTask('3');
  let t4 = makeTask('4');
  let t5 = makeTask('5');


  const collector = C.make_task_collector()

  let task_set = C.collect_chain(collector)


  const resultFn = pipe(C.makeIdentityTask,chain(t1),chain(collector),chain(t2),chain(collector),chain(t3),chain(collector),chain(t4),chain(collector))

  const resultFn2 = pipe(C.makeIdentityTask,chain(t5),chain(collector))
  const final = pipe(resultFn,chain(resultFn2))

  final().fork(

    console.error,
    _=>{
      expect(_.length).toBe(5);

      expect(_).toEqual(['1','2','3','4','5'])

      done();
    }
  )

});



test ("compose a collected chain",(done)=>{


  let t1 =  makeTask('1');
  let t2 =  makeTask('2');
  let t3 =  makeTask('3');
  let t4 =  makeTask('4');
  let t5 =  makeTask('5');


  const collector = C.make_task_collector()

  let task_set = C.collect_chain(collector)


  const resultFn = task_set(t1,t2,t3,t4)

  const resultFn2 = pipe(resultFn,chain(task_set(t5)))


  resultFn2().fork(

    console.error,
    _=>{
      expect(_.length).toBe(5);

      expect(_).toEqual(['1','2','3','4','5'])

      done();
    }
  )

});

test ("compose a collected chain2 , several tasks append",(done)=>{


  let t1 =  makeTask('1');
  let t2 =  makeTask('2');
  let t3 =  makeTask('3');
  let t4 =  makeTask('4');
  let t5 =  makeTask('5');
  let t6 =  makeTask('6');


  const collector = C.make_task_collector()

  let task_set = C.collect_chain(collector)


  const resultFn = task_set(t1,t2,t3,t4)

  const resultFn2 = pipe(resultFn,chain(task_set(t5,t6)))


  resultFn2().fork(

    console.error,
    _=>{
      expect(_.length).toBe(6);

      expect(_).toEqual(['1','2','3','4','5','6'])

      done();
    }
  )

});

test ("shorthand",(done)=>{


  let t1 = makeTask('1');
  let t2 = makeTask('2');
  let t3 = makeTask('3');
  let t4 = makeTask('4');
  let t5 = makeTask('5');
  let t6 = makeFailTask('6');

  const {extend,run} = C.useTaskChainCollection(t1,t2);


  run(
    console.error,
    _=>{
      console.log(_)
      expect(_.length).toBe(2);

      expect(_).toEqual(['1','2'])
      done();

    }
  )

});

test ("shorthand extend",(done)=>{


  let t1 =  makeTask('1');
  let t2 =  makeTask('2');
  let t3 =  makeTask('3');
  let t4 =  makeTask('4');
  let t5 =  makeTask('5');
  let t6 =  makeFailTask('6');

  const {extend,run} = C.useTaskChainCollection(t1,t2);

  extend(t3,t4)(console.error,_=>{
    console.log(_)
    expect(_.length).toBe(4)
    done()
  })

});

test ("shorthand extend",(done)=>{


  let t1 =  makeTask('1');
  let t2 =  makeTask('2');
  let t3 =  makeTask('3');
  let t4 =  makeTask('4');
  let t5 =  makeTask('5');
  let t6 =  makeFailTask('6');

  const {extend,run} = C.useTaskChainCollection(t1,t2);




  extend(t3,t4)(
    console.error,
    _=>{
      expect(_.length).toBe(4)
      done()
    }
  )


});

test ("failing chain",(done)=>{


  let t1 =  makeTask('1');
  let t2 =  makeTask('2');
  let t6 =  makeFailTask('6');

  const {extend,run} = C.useTaskChainCollection(t1,t6,t2);


  run(
    _=>{
      done()
    },
    console.error
  )

});

test ("COMPOSE TASK TEST",(done)=>{


  let t1 =  makeTask('1');
  let t2 =  makeTask('2');
  let t3 =  makeTask('3');
  let t4 =  makeTask('4');

  const {extend,run} = C.useTaskChainCollection(t1,t2);
    extend(compose(map(x=>`${x}_${x}`),t3),t4)(console.error,_=>{
      expect(_.length).toBe(4)
      expect(_[2]).toBe('3_3')
      done()
    })

});



test ("SH2",(done)=>{


  let t1 = makeTask('1');
  let t2 = makeTask('2');
  let t3 = makeTask('3');
  let t4 = makeTask('4');
  let t5 = makeTask('5');
  let t6 = makeFailTask('6');

  const res = C.ChainableTaskCreator()(t1,t2);

  console.log(res)
  
  res.chain(t3,t4).fork(
    _=> console.error,
    _=> {

        console.log('hey',_)
        expect(_.length).toBe(4)
        done();
     
    }
  )

});


test ("SH2 2",(done)=>{


  let t1 = makeTask('1');
  let t2 = makeTask('2');
  let t3 = makeTask('3');
  let t4 = makeTask('4');
  let t5 = makeTask('5');
  let t6 = makeFailTask('6');

  const res = C.ChainableTaskCreator()(t1,t2);

  console.log(res)
  
  res.fork(
    _=> console.error,
    _=> {

        console.log('hey',_)
        expect(_.length).toBe(2)
        res.chain(t3,t4).fork(
          _=> console.error,
          x => {
            console.log(x)
            expect(x.length).toBe(6)
            done();
          }
        )
    }
  )
});


test ("Named results",(done)=>{


  let t1 = makeTask('1');
  let t2 = makeTask('2');

  let p1 = makeTaskPromise( new Promise((res,rej)=>{
    res('3')
  }) )

  const res = C.ChainableTaskCreator(C.useTaskCollectorAsObject())(C.namedTask('key1',t1),C.namedTask('key2',t2),C.namedTask('key3',p1));

  console.log(res)
  
  res.fork(
    _=> console.error,
    _=> {

        console.log('hey',_)
        expect(Object.keys(_).length).toBe(3)
        done()
    }
  )
});



test ("Shorthand list & object",(done)=>{

  const {TaskChainList,TaskChainObject,namedTask}  = C;

  let t1 = makeTask('1');
  let t2 = makeTask('2');

  let p1 = makeTaskPromise( new Promise((res,rej)=>{
    res('3')
  }) )


  const init = TaskChainList(t1,t2);

  const init2 = TaskChainObject(
    namedTask('key1',t1),
    namedTask('key2',t2),
    namedTask('promise',p1)
  )
  
  init.fork(
    _=> console.error,
    _=> {

        console.log('hey',_)
        expect(_.length).toBe(2)

        init2.fork(
          _=> console.error,
          result => {
          expect(Object.keys(result).length).toBe(3)
          done()


        } )


    }
  )
});