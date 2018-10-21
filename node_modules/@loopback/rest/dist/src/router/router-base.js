"use strict";
// Copyright IBM Corp. 2017, 2018. All Rights Reserved.
// Node module: @loopback/rest
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
const routing_table_1 = require("./routing-table");
const openapi_path_1 = require("./openapi-path");
const route_sort_1 = require("./route-sort");
/**
 * Base router implementation that only handles path without variables
 */
class BaseRouter {
    constructor() {
        /**
         * A map to optimize matching for routes without variables in the path
         */
        this.routesWithoutPathVars = {};
    }
    getKeyForRoute(route) {
        const path = route.path.startsWith('/') ? route.path : `/${route.path}`;
        const verb = route.verb.toLowerCase() || 'get';
        return `/${verb}${path}`;
    }
    add(route) {
        if (!openapi_path_1.getPathVariables(route.path)) {
            const key = this.getKeyForRoute(route);
            this.routesWithoutPathVars[key] = route;
        }
        else {
            this.addRouteWithPathVars(route);
        }
    }
    getKeyForRequest(request) {
        const method = request.method.toLowerCase();
        return `/${method}${request.path}`;
    }
    find(request) {
        const path = this.getKeyForRequest(request);
        let route = this.routesWithoutPathVars[path];
        if (route)
            return routing_table_1.createResolvedRoute(route, {});
        else
            return this.findRouteWithPathVars(request);
    }
    list() {
        let routes = Object.values(this.routesWithoutPathVars);
        routes = routes.concat(this.listRoutesWithPathVars());
        // Sort the routes so that they show up in OpenAPI spec in order
        return routes.sort(route_sort_1.compareRoute);
    }
}
exports.BaseRouter = BaseRouter;
//# sourceMappingURL=router-base.js.map