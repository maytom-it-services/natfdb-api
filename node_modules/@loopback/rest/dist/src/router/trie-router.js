"use strict";
// Copyright IBM Corp. 2017, 2018. All Rights Reserved.
// Node module: @loopback/rest
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
const routing_table_1 = require("./routing-table");
const trie_1 = require("./trie");
const util_1 = require("util");
const router_base_1 = require("./router-base");
const debug = require('debug')('loopback:rest:router:trie');
/**
 * Router implementation based on trie
 */
class TrieRouter extends router_base_1.BaseRouter {
    constructor() {
        super(...arguments);
        this.trie = new trie_1.Trie();
    }
    addRouteWithPathVars(route) {
        // Add the route to the trie
        const key = this.getKeyForRoute(route);
        this.trie.create(key, route);
    }
    findRouteWithPathVars(request) {
        const path = this.getKeyForRequest(request);
        const found = this.trie.match(path);
        debug('Route matched: %j', found);
        if (found) {
            const route = found.node.value;
            if (route) {
                debug('Route found: %s', util_1.inspect(route, { depth: 5 }));
                return routing_table_1.createResolvedRoute(route, found.params || {});
            }
        }
        return undefined;
    }
    listRoutesWithPathVars() {
        return this.trie.list().map(n => n.value);
    }
}
exports.TrieRouter = TrieRouter;
//# sourceMappingURL=trie-router.js.map