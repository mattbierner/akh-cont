# Continuation monad and monad transformer for [Akh Javascript Monad Transformer Library](https://github.com/mattbierner/akh)

The continuation transformer `ContT` layers continuation control over a monad. The base type `Cont`, provides continuation control on its own. The continuation transformer is a monad, functor, and applicative functor.

```bash
# To use as standalone package
$ npm install --save akh.cont

# To use as part of akh library
$ npm install --save akh
```

## Usage
The cont monad/transformer implements the [Fantasy Land][fl] monad, function, and applicative functor interfaces.

<a href="https://github.com/fantasyland/fantasy-land">
    <img src="https://raw.github.com/fantasyland/fantasy-land/master/logo.png" align="right" width="82px" height="82px" alt="Fantasy Land logo" />
</a>

```js
// Continuation monad
require('akh.cont').Cont
require('akh').Cont

// Continuation monad transformer
require('akh.cont').ContT
require('akh').ContT
```

#### `Cont.runCont(m, k)`, `m.run(k)`
Perform a continuation computation `m` and complete with outer continuation `k`.

```js
const Cont = requre('akh.cont').Cont

const c = Cont.of(3)
    .callcc(k =>
        k(4).map(x => x + 1))
    .map((x) => -x)

Cont.run(c, console.log) // logs: -4
c.run(console.log)
```

#### `ContT.run(m, k)`, `t.run(k)`
Same as `Cont.runCont` but for transformed types.

#### `Cont.callcc(f)`
Reify the current continuation and pass it to `f`. `f` can invoke the continuation with a computation to continue execution, or return a computation directly to abort without calling the continuation. `f` may also capture the continuation `k` and invoke it multiple times with different values.

#### `ContT.callcc(m, k)`
Same as `Cont.callcc` but for transformed types


## Contributing
Contributions are welcome.

To get started:

```bash
$ cd akh-cont
$ npm install # install dev packages
$ npm test # run tests
```
