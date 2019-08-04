const {compose,map,distribute,pipe,merge,identity} = require('../src/index')





test('testing map law 2', () => {
  /*
  testing that

    compose(map(f), map(g)) === map(compose(f, g)) == dist(map)(f,g);
  */

  let array = ['a','b','c','d'];

  let g = item => item.charCodeAt(0)

  let f = item => String.fromCharCode(item)

  //console.log(map(g)(array))
  expect(map(g)(array)).toEqual([ 97, 98, 99, 100 ])
  expect(map(f)(map(g)(array))).toEqual(array)

  let c1 = compose(map(f),map(g));
  expect(c1(array)).toEqual(array)

  let c2 = map(compose(f,g))

  expect(c2(array)).toEqual(array)

  let c3 = distribute(compose)(map)(f,g)
  expect(c3(array)).toEqual(array);

  let c4 = distribute(pipe)(map)(g,f)
  expect(c4(array)).toEqual(array);

});


test('testing map law with 3', () => {
  /*
  testing that

    compose(map(f), map(g),map(h)) === map(compose(f, g,h)) == dist(map)(f,g,h);
  */

  let array = ['a','b','c','d'];
  let expected = [ 97, 98, 99, 100 ];

  //Array[String] -> Array[Int]
  let g = item => item.charCodeAt(0)
  //Array[Int] -> Array[String]
  let f = item => String.fromCharCode(item)

  //Array[String] -> Array[Int]
  let h = g;

  let c1 = compose(map(h),map(f),map(g));
  expect(c1(array)).toEqual(expected)

  let c2 = map(compose(h,f,g))
  expect(c2(array)).toEqual(expected)

  let c3 = distribute(compose)(map)(h,f,g)
  expect(c3(array)).toEqual(expected);

  let c4 = distribute(pipe)(map)(g,f,h)
  expect(c4(array)).toEqual(expected);
});



test('configuration test', () => {

  const assemble = distribute(compose)(merge);

  const to_prop = key=> settings => {
    let o = {}
    o[key]=settings
    return o;
  }

  const keyA = to_prop('keyA');
  const keyB = to_prop('keyB');

  let configure_a = compose (keyA,identity({a:true}))

  let configure = assemble(configure_a,keyB({b:true}))


  console.log(configure({z:true}))


});
