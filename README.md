[Akh](https://github.com/mattbierner/akh) continuation monad

## API
The continuation transformer `ContT` layers continuation control over a monad. The base type `Cont`, provides continuation control on its own. The continuation transformer is a monad, functor, and applicative functor.

### `require('akh.cont').Cont`
Continuation monad. 

#### `Cont.runCont(m, k)` `m.run(k)`
Perform a continuation computation `m` and complete with outer continuation `k`.

```js
const Cont = requre('akh.cont').Cont

var c = Cont.of(3)
        .callcc(k =>
            k(4).map(x => x + 1))
        .map((x) => -x);

Cont.run(c, console.log); // logs: -4
c.run(console.log)
```

#### `Cont.callcc(f)`
Reify the current continuation and pass it to `f`. `f` can invoke the continuation with a computation to continue execution, or return a computation directly to abort without calling the continuation. `f` may also capture the continuation `k` and invoke it multiple times with different values.

----

### `require('akh.cont').ContT`
The continuation transformer, layers continuation control over a monad. 

#### `ContT.run(m, k)` `t.run(k)`
Same as `Cont.runCont` but for transformed types

#### `ContT.callcc(m, k)`
Same as `Cont.callcc` but for transformed types
