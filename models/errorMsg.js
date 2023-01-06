'use strict';

class ErrorMsg {
    constructor(obj = {}) {
        this.message = obj?.message ?? "";
    }
}

module.exports = ErrorMsg;