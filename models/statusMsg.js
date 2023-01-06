'use strict';

class StatusMsg {
    constructor(obj = {}) {
        this.status = obj?.status ?? null;
    }
}