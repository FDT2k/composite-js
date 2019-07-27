# Javascript composite functions kit

![Alt text](./coverage/badge-lines.svg)
## Warning: this is NOT the classic compose & pipe function.

in a classic compose function, only the rightmost function may have any arity, others must be unary.
For the classic pipe the leftmost function may have any arity; the remaining functions must be unary.



  function a (arg){
	   //.... whatever
	}
	function b (arg2,arg3){

  }
	let enhanced = compose(a,b)
	// enhanced would be the equivalent of  a(b(...args));
	so a would receive only the result of b as an unique parameter



This version preserves the arity along the chain, the last one of the chain can return any arity
 so

  function a (arg2,arg3){
	//.... whatever
    return [arg2,arg3]
	}

	function b (arg2,arg3){
    // some code
    return [arg2,arg3]
	}

	let enhanced = compose(a,b)
	// enhanced would be the equivalent of  a(...b(...args));
	a & b should & receive the same parameters

### Examples

Let's say we wrote a function that is used

    let write = (payload, callback) =>{
    	//whatever
    }

Later we want to extends the features and normalize the payload for example

    let normalize = (payload,callback)=>{
		// whatever
		return [payload,callback] //<- this is mandatory for the argument to spread
	}

	let enhanced_write = pipe(normalize,write)

#### middleware & plugin of the poor

    let greeting = (firstname,lastname)=>{
	    console.log(`hello ${firstname} ${lastname}`)
    }
    let capitalize = (what)=> (...args)=> {
	    args[what].toUpperCase()
	    return args
	}

    let enhanced_greeting = pipe(capitalize(0),capitalize(1),greeting)

#### named args
	// this can be done
    const funcA =(...args)=>{
	    let [ firstarg, secondArg, ...passThrough ] = args
	    //... whatever
	    return [ firstarg, secondArg, ...passThrough ]
    }

	// this way is more a bit more confusing by the syntax
    const funcB =(...[arg1,...passThrough])=>{
	    //whatever
	    return [arg1,...passThrough]
    }

#### Compose functions everywhere !!!!!!!
