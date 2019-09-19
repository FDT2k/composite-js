

// safeCall :: Functor f => (a -> c) -> b -> a b -> c
export const safeCall = a => b => a(b)

// safePropCall :: {x} -> Scalar -> (a,...,z) -> c
export const safePropCall = x => z => (...a)=>{return x[z](...a)}


/**
 * compose a diverge with another function
 *
 * @func
 * @category Function
 * @sig
 * @param {Functions} function to compose
 * @param {...Functions} functions the function to diverge
 * @return {Function}
 * @see compose
 * @see diverge
 *
 */
export const divergeRightThen = z =>(...args) => compose (z,diverge(...args))

// divergeLeftThen  :: ([a]->b) -> ((a->b),(a->c),...,(a->z)) -> [a,c,...,z] -> b
/**
 * pipe a diverge with another function
 *
 * @func
 * @category Function
 * @sig
 * @param {Functions} function to pipe
 * @param {...Functions} functions the function to diverge
 * @return {Function}
 * @see compose
 * @see diverge
 *
 */
export const divergeLeftThen = z => (...args) => pipe (diverge(...args),z)
// callee :: a -> b -> a(b)
export const callee = x => x();
export const match = curry((re, str) => re.test(str));
