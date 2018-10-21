"use strict";
// Copyright IBM Corp. 2017. All Rights Reserved.
// Node module: @loopback/repository
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable:no-any
/**
 * Any type
 */
class AnyType {
    constructor() {
        this.name = 'any';
    }
    isInstance(value) {
        return true;
    }
    isCoercible(value) {
        return true;
    }
    defaultValue() {
        return undefined;
    }
    coerce(value) {
        return value;
    }
    serialize(value) {
        if (value && typeof value.toJSON === 'function') {
            return value.toJSON();
        }
        return value;
    }
}
exports.AnyType = AnyType;
//# sourceMappingURL=any.js.map