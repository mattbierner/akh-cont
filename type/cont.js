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
Cont.runCont = (m, k) =>
    Identity.runIdentity(ContT.runContT(m, x => Identity.of(k(x))))

module.exports = Cont;
