/**
 * Continuation monad transformer.
 */
"use strict"
const tramp = require('akh.core.trampoline')
const spec = require('akh.core.spec')
const ContMonad = require('../spec/cont')

/* Transformer
 ******************************************************************************/
var runContT = (m, k) =>
    tramp.tail(m._run, k)

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
                t.chain(x => tramp.trampoline(k(x)))))
    
    const reify = k => x => new Instance(_ => k(x))

    ContMonad(Instance,
        f =>
            new Instance(k =>
                runContT(
                    f(reify(k)),
                    k)))
    
    Instance.prototype.run = function(k) {
        return ContT.run(this, k)
    }

    return Instance
}

/**
 * Perform a continuation computation and complete with `k`.
 * 
 * @param m ContT computation.
 * @param k Outer continuation.
 */
ContT.run = (m, k) =>
    tramp.trampoline(runContT(m, k))

module.exports = ContT