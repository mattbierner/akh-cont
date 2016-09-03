"use strict";
const assert = require('chai').assert
const Cont = require('../index').Cont

const sqr = x => x * x

describe("Cont", () => {
    it("simple of", () => {
        const c = Cont.of(3)

        assert.strictEqual(9, Cont.run(c, sqr))
    })

    it("simple chain", () => {
        const c = Cont.of(3).chain(function (x) {
            return Cont.of(x + 5)
        })

        assert.strictEqual(64, Cont.run(c, sqr))
        assert.strictEqual(64, c.run(sqr))
    })

    it("chain", () => {
        const c = Cont.of(3)
            .chain(function (x) {
                return Cont.of(x + 5)
            })
            .chain(function (x) {
                return Cont.of(x / 2)
            })

        assert.strictEqual(16, Cont.run(c, sqr))
    })

    it("many chain", () => {
        let c = Cont.of(0)

        for (let i = 0;  i < 10000;  ++i) {
            c = c.chain(function (x) {
                return Cont.of(x + 1)
            })
        }

        assert.strictEqual(
            Cont.run(c, sqr),
            10000 * 10000)
    })

    it("many inner chain", () => {
        const f = function (x) {
            if (x > 10000)
                return Cont.of(x)
            return Cont.of(x + 1).chain(f)
        }

        assert.strictEqual(
            Cont.run(f(0), sqr),
            10001 * 10001)
    })

    it("simple callcc", () => {
        const c = Cont.of(3)
            .callcc(function (k) {
                return k(4)
            })

        assert.strictEqual(
            Cont.run(c, sqr),
            16)
    })

    it("callcc breaks", () => {
        const c = Cont.of(3)
            .callcc(k =>
                k(4).chain(() => Cont.of(1)))

        assert.strictEqual(
            Cont.run(c, sqr),
            16)
    })

    it("callcc chain", () => {
        const c = Cont.of(3)
            .callcc(function (k) {
                return k(5)
            })
            .chain(function (x) {
                return Cont.of(x + 1)
            })

        assert.strictEqual(
            Cont.run(c, sqr),
            36)
    })

    it("fmap", () => {
        const c = Cont.of(3)
            .map(function (x) {
                return x * x
            })
            .chain(function (x) {
                return Cont.of(x + 1)
            })

        assert.strictEqual(
            Cont.run(c, sqr),
            10 * 10)
    })
}) 