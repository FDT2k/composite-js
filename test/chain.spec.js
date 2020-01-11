import * as C from '../src/chain'
import * as F from '../src/functor'
import {pipe,compose,chain} from '../src/core'

test ("1 in chain",(done)=>{
  let maketask  = _ => new F.Task ((reject,resolve)=>{ resolve(_) })
  let t1 = _=> maketask('1');
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
  let maketask  = _ => new F.Task ((reject,resolve)=>{ resolve(_) })


  let t1 = _=> maketask('1');
  let t2 = _=> maketask('2');
  let t3 = _=> maketask('3');
  let t4 = _=> maketask('4');


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
  let maketask  = _ => new F.Task ((reject,resolve)=>{ resolve(_) })


  let t1 = _=> maketask('1');
  let t2 = _=> maketask('2');
  let t3 = _=> maketask('3');
  let t4 = _=> maketask('4');
  let t5 = _=> maketask('5');


  const collector = C.make_task_collector()

  let task_set = C.collect_chain(collector)


  const resultFn = pipe(C.identity_task,chain(t1),chain(collector),chain(t2),chain(collector),chain(t3),chain(collector),chain(t4),chain(collector))

  const resultFn2 = pipe(C.identity_task,chain(t5),chain(collector))
  const final = pipe(resultFn,chain(resultFn2))

  final().fork(

    console.error,
    _=>{
      console.log(_)
      expect(_.length).toBe(5);

      expect(_).toEqual(['1','2','3','4','5'])

      done();
    }
  )

});



test ("compose a collected chain",(done)=>{
  let maketask  = _ => new F.Task ((reject,resolve)=>{ resolve(_) })


  let t1 = _=> maketask('1');
  let t2 = _=> maketask('2');
  let t3 = _=> maketask('3');
  let t4 = _=> maketask('4');
  let t5 = _=> maketask('5');


  const collector = C.make_task_collector()

  let task_set = C.collect_chain(collector)


  const resultFn = task_set(t1,t2,t3,t4)

  const resultFn2 = pipe(resultFn,chain(task_set(t5)))


  resultFn2().fork(

    console.error,
    _=>{
      console.log(_)
      expect(_.length).toBe(5);

      expect(_).toEqual(['1','2','3','4','5'])

      done();
    }
  )

});
