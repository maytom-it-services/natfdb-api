"use strict";
// Copyright IBM Corp. 2017,2018. All Rights Reserved.
// Node module: @loopback/repository
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
const legacy_juggler_bridge_1 = require("./legacy-juggler-bridge");
/**
 * Polyfill for Symbol.asyncIterator
 * See https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-3.html
 */
// tslint:disable-next-line:no-any
if (!Symbol.asyncIterator) {
    // tslint:disable-next-line:no-any
    Symbol.asyncIterator = Symbol.for('Symbol.asyncIterator');
}
/**
 * An implementation of KeyValueRepository based on loopback-datasource-juggler
 */
class DefaultKeyValueRepository {
    /**
     * Construct a KeyValueRepository with a legacy DataSource
     * @param ds Legacy DataSource
     */
    constructor(entityClass, ds) {
        this.entityClass = entityClass;
        // KVModel class is placeholder to receive methods from KeyValueAccessObject
        // through mixin
        this.kvModelClass = ds.createModel('_kvModel');
    }
    delete(key, options) {
        return legacy_juggler_bridge_1.ensurePromise(this.kvModelClass.delete(key, options));
    }
    deleteAll(options) {
        return legacy_juggler_bridge_1.ensurePromise(this.kvModelClass.deleteAll(options));
    }
    toEntity(modelData) {
        if (modelData == null)
            return modelData;
        let data = modelData;
        if (typeof modelData.toObject === 'function') {
            // tslint:disable-next-line:no-any
            data = modelData.toObject();
        }
        return new this.entityClass(data);
    }
    async get(key, options) {
        const val = this.kvModelClass.get(key, options);
        const result = await legacy_juggler_bridge_1.ensurePromise(val);
        return this.toEntity(result);
    }
    set(key, value, options) {
        return legacy_juggler_bridge_1.ensurePromise(this.kvModelClass.set(key, value, options));
    }
    expire(key, ttl, options) {
        return legacy_juggler_bridge_1.ensurePromise(this.kvModelClass.expire(key, ttl, options));
    }
    ttl(key, options) {
        return legacy_juggler_bridge_1.ensurePromise(this.kvModelClass.ttl(key, options));
    }
    keys(filter, options) {
        const kvModelClass = this.kvModelClass;
        const iterator = {
            [Symbol.asyncIterator]() {
                return new AsyncKeyIteratorImpl(kvModelClass.iterateKeys(filter, options));
            },
        };
        return iterator;
    }
}
exports.DefaultKeyValueRepository = DefaultKeyValueRepository;
class AsyncKeyIteratorImpl {
    constructor(keys) {
        this.keys = keys;
    }
    next() {
        const key = legacy_juggler_bridge_1.ensurePromise(this.keys.next());
        return key.then(k => {
            return { done: k === undefined, value: k || '' };
        });
    }
}
//# sourceMappingURL=kv.repository.bridge.js.map