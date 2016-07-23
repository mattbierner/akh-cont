/**
 * @fileOverview Very basic tail calls
 */
const Tail = module.exports.Tail = function(f, x) {
    this.f = f
    this.x = x
}

module.exports.trampoline = f => {
    var value = f
    while (value instanceof Tail)
        value = value.f(value.x)
    return value
}
