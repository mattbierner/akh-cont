"use strict"

/**
 * Continuation monad interface
 */
module.exports = (instance, callcc) => {
    /**
     * M.callcc(f)
     * 
     * Call `f` with the current continuation. If `f` returns a computation,
     * discard the existing continuation and return the result. If `f` returns 
     * the result of calling the continuation with a computation, execution continues.
     */
    instance.callcc = instance.prototype.callcc = callcc
    
    return instance
}
