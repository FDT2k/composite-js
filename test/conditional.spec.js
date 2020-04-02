import {either,tryCatcher,eitherUndefined,eitherThrow} from 'conditional'
import {empty} from 'bool'
import {curry,compose} from 'Core'

test ("either",()=>{
    let no = x=>`no`
    let yes = x=>`yes`
    let undef
    let notundef= 'couocu'
    expect(
      either(empty,no,yes)('')
    ).toBe('yes')
  
    expect(
      either(empty,no,yes)('sdsd')
    ).toBe('no')
  
    expect(
      eitherUndefined(no,yes)(undef)
    ).toBe('yes')
  
    expect(
      eitherUndefined(no,yes)(notundef)
    ).toBe('no')
  
    expect(
      ()=>{
        eitherThrow(empty,'should be empty')('caca')
      }
    ).toThrow('should be empty');
  
  
  })
  
  test ('trycatcher', (done)=>{
  
    const on_error = (err)=>{
      console.error(err)
    }
  
    const working_fn = ()=>{
  
      done()
  
    }
    tryCatcher(on_error,working_fn,null);
  
  });
  
  test ('trycatcher is catching', (done)=>{
  
    const failing_fn = ()=>{
      coucouasdnoiadfsjiadfoij
    }
  
    const catch_err = (err)=>{
      done();
    }
    tryCatcher(catch_err,failing_fn,null)
  
  
  })
  