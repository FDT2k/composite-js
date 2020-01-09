import * as C from '../src/chain'
import * as F from '../src/functor'



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
      done();
    }
  )

});
