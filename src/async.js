/*

Async composition funcs

*/


// syncify - Make an async call sync
// syncify :: Promise -> Function ->  a
export const syncify = promise => callback=> promise.then(callback).catch(callback)
