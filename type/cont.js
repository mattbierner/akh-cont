"use strict"
const Identity = require('akh.identity').type.identity;
const ContT = require('../trans/cont');

/**
 * Continuation monad
 */
const Cont = ContT(Identity);

/* 
/**
 * Perform a continuation computation .
 * 
 * @param m Computation.
 * @param k Outer continuation.
 */
Cont.run = (m, k) =>
    Identity.run(ContT.run(m, x => Identity.of(k(x))))

Cont.prototype.run = function(k) {
    return Cont.run(this, k)
}

module.exports = Cont;
