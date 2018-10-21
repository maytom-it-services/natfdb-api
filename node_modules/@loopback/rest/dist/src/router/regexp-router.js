"use strict";
// Copyright IBM Corp. 2017, 2018. All Rights Reserved.
// Node module: @loopback/rest
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
const routing_table_1 = require("./routing-table");
const util_1 = require("util");
const route_sort_1 = require("./route-sort");
const pathToRegExp = require("path-to-regexp");
const router_base_1 = require("./router-base");
const openapi_path_1 = require("./openapi-path");
const debug = require('debug')('loopback:rest:router:regexp');
/**
 * Router implementation based on regexp matching
 */
class RegExpRouter extends router_base_1.BaseRouter {
    constructor() {
        super(...arguments);
        this.routes = [];
    }
    _sort() {
        if (!this._sorted) {
            this.routes.sort(route_sort_1.compareRoute);
            this._sorted = true;
        }
    }
    addRouteWithPathVars(route) {
        const path = openapi_path_1.toExpressPath(route.path);
        const keys = [];
        const regexp = pathToRegExp(path, keys, { strict: false, end: true });
        const entry = Object.assign(route, { keys, regexp });
        this.routes.push(entry);
        this._sorted = false;
    }
    findRouteWithPathVars(request) {
        this._sort();
        for (const r of this.routes) {
            debug('trying endpoint %s', util_1.inspect(r, { depth: 5 }));
            if (r.verb !== request.method.toLowerCase()) {
                debug(' -> verb mismatch');
                continue;
            }
            const match = r.regexp.exec(request.path);
            if (!match) {
                debug(' -> path mismatch');
                continue;
            }
            const pathParams = this._buildPathParams(r, match);
            debug(' -> found with params: %j', pathParams);
            return routing_table_1.createResolvedRoute(r, pathParams);
        }
        return undefined;
    }
    listRoutesWithPathVars() {
        this._sort();
        return this.routes;
    }
    _buildPathParams(route, pathMatch) {
        const pathParams = {};
        for (const ix in route.keys) {
            const key = route.keys[ix];
            const matchIndex = +ix + 1;
            pathParams[key.name] = pathMatch[matchIndex];
        }
        return pathParams;
    }
}
exports.RegExpRouter = RegExpRouter;
//# sourceMappingURL=regexp-router.js.map