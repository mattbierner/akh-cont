"use strict"

const contT = require('./trans/cont');
const cont = require('./type/cont');

module.exports = {
    ContT: contT,
    Cont: cont,

    trans: { cont: contT },
    type: { cont: cont }
};
