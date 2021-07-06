"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function assert(condition, errorMessage) {
    if (!condition) {
        throw new Error(errorMessage);
    }
}
exports.default = assert;
