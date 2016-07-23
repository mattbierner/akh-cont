/**
 * Continuation monad transformer.
 */
"use strict"
const tail = require('./_tail')
const spec = require('akh.core.spec')
const ContMonad = require('../spec/cont')

/* Transformer
 ******************************************************************************/
var runContT = (m, k) =>
    new tail.Tail(m._run, k)

/**
 * Continuation monad transformer.
 * 
 * @param m Base monad.
 */
const ContT = m => {
    var Instance = function (run) {
        this._run = run
    }
    
    spec.Monad(Instance,
        x => new Instance(k => k(x)),
        
        function chain(f) {
            return new Instance(k =>
                runContT(this, x => runContT(f(x), k)))
            })
    
    spec.Transformer(Instance, m,
        t =>
            new Instance(k =>
                t.chain(x => tail.trampoline(k(x)))))
    
    const reify = k => x => new Instance(_ => k(x))

    ContMonad(Instance,
        f =>
            new Instance(k =>
                runContT(
                    f(reify(k)),
                    k)))
    
    return Instance
}

/**
 * Perform a continuation computation and complete with `k`.
 * 
 * @param m ContT computation.
 * @param k Outer continuation.
 */
ContT.runContT = (m, k) =>
    tail.trampoline(runContT(m, k))

module.exports = ContT