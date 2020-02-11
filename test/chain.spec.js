import * as C from '../src/chain'
import * as F from '../src/functor'
import {pipe,compose,chain,map} from '../src/core'

const makeTask  = _ => new F.Task ((reject,resolve)=>{ resolve(_) })
const makeFailTask  = _ => new F.Task ((reject,resolve)=>{ reject(`fail ${_}`) })



test ("1 in chain",(done)=>{
  let t1 = _=> makeTask('1');
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


  let t1 = _=> makeTask('1');
  let t2 = _=> makeTask('2');
  let t3 = _=> makeTask('3');
  let t4 = _=> makeTask('4');


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


  let t1 = _=> makeTask('1');
  let t2 = _=> makeTask('2');
  let t3 = _=> makeTask('3');
  let t4 = _=> makeTask('4');
  let t5 = _=> makeTask('5');


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


  let t1 = _=> makeTask('1');
  let t2 = _=> makeTask('2');
  let t3 = _=> makeTask('3');
  let t4 = _=> makeTask('4');
  let t5 = _=> makeTask('5');


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


  let t1 = _=> makeTask('1');
  let t2 = _=> makeTask('2');
  let t3 = _=> makeTask('3');
  let t4 = _=> makeTask('4');
  let t5 = _=> makeTask('5');
  let t6 = _=> makeTask('6');


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


  let t1 = _=> makeTask('1');
  let t2 = _=> makeTask('2');
  let t3 = _=> makeTask('3');
  let t4 = _=> makeTask('4');
  let t5 = _=> makeTask('5');
  let t6 = _=> makeFailTask('6');

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


  let t1 = _=> makeTask('1');
  let t2 = _=> makeTask('2');
  let t3 = _=> makeTask('3');
  let t4 = _=> makeTask('4');
  let t5 = _=> makeTask('5');
  let t6 = _=> makeFailTask('6');

  const {extend,run} = C.useTaskChainCollection(t1,t2);

  extend(t3,t4)(console.error,_=>{
    console.log(_)
    expect(_.length).toBe(4)
    done()
  })

});

test ("shorthand extend",(done)=>{


  let t1 = _=> makeTask('1');
  let t2 = _=> makeTask('2');
  let t3 = _=> makeTask('3');
  let t4 = _=> makeTask('4');
  let t5 = _=> makeTask('5');
  let t6 = _=> makeFailTask('6');

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


  let t1 = _=> makeTask('1');
  let t2 = _=> makeTask('2');
  let t6 = _=> makeFailTask('6');

  const {extend,run} = C.useTaskChainCollection(t1,t6,t2);


  run(
    _=>{
      done()
    },
    console.error
  )

});

test ("COMPOSE TASK TEST",(done)=>{


  let t1 = _=> makeTask('1');
  let t2 = _=> makeTask('2');
  let t3 = _=> makeTask('3');
  let t4 = _=> makeTask('4');

  const {extend,run} = C.useTaskChainCollection(t1,t2);



    extend(compose(map(x=>`${x}_${x}`),t3),t4)(console.error,_=>{
      expect(_.length).toBe(4)
      expect(_[2]).toBe('3_3')
      done()
    })



});
