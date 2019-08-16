const {compose,map,prop,curry,maybe,trace,IO,Maybe} = require('../src/index')
const {store} = require('../src/store')
test('Maybe', () => {
  // safeHead :: [a] -> Maybe(a)
  const safeHead = xs => Maybe.of(xs[0]);

  const safeId = a => Maybe.of(a)

  const addresses = compose (maybe([],prop('addresses')),safeId)

  const street = compose(map(prop('street')), safeHead)

  // streetName :: Object -> Maybe String
  const streetName = compose( street , addresses);

  streetName({ addresses: [] });11
  // Nothing

  let res = streetName({ addresses: [{ street: 'Shady Ln.', number: 4201 }] });
  console.log(res)


  res = streetName();
  console.log(res)


  const streets = compose(maybe([],map(prop('street'))), safeId)
  const streetNames = compose( streets , addresses);
  res = streetNames({ addresses: [{ street: 'sdg Ln.', number: 4201 },{ street: 'sdf Ln.', number: 4201 },{ street: 'sdfs Ln.', number: 4201 }] })
  console.log(res)

  res = streetNames({})
  console.log(res)
});


test('withdraw',()=>{
  // withdraw :: Number -> Account -> Maybe(Account)
const withdraw = curry((amount, { balance }) =>
  Maybe.of(balance >= amount ? { balance: balance - amount } : null));

// This function is hypothetical, not implemented here... nor anywhere else.
// updateLedger :: Account -> Account
const updateLedger = account => account;

// remainingBalance :: Account -> String
const remainingBalance = ({ balance }) => `Your balance is $${balance}`;

// finishTransaction :: Account -> String
const finishTransaction = compose(remainingBalance, updateLedger);


// getTwenty :: Account -> Maybe(String)
const getTwenty = compose(maybe('nope',finishTransaction), withdraw(20));

let res = getTwenty({ balance: 200.00 });
// Just('Your balance is $180')
console.log(res)
res = getTwenty({ balance: 10.00 });
// Nothing
console.log(res)

})


test ('IO',()=>{
  const myStore = store();
  myStore.set ('bla','hello world')
  const ioStore = new IO(() => myStore);
//  let bla = ioStore.map(store =>store.get('bla'));
  //let test = compose(trace('coucou'),ioStore)
  console.log(ioStore.$value());
  console.log(ioStore.map(store=>store.get('bla')).$value());


});
