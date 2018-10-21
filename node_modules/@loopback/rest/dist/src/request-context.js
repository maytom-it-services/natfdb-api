"use strict";
// Copyright IBM Corp. 2017. All Rights Reserved.
// Node module: @loopback/rest
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
const context_1 = require("@loopback/context");
const keys_1 = require("./keys");
/**
 * A per-request Context combining an IoC container with handler context
 * (request, response, etc.).
 */
class RequestContext extends context_1.Context {
    constructor(request, response, parent, name) {
        super(parent, name);
        this.request = request;
        this.response = response;
        this._setupBindings(request, response);
    }
    _setupBindings(request, response) {
        this.bind(keys_1.RestBindings.Http.REQUEST)
            .to(request)
            .lock();
        this.bind(keys_1.RestBindings.Http.RESPONSE)
            .to(response)
            .lock();
        this.bind(keys_1.RestBindings.Http.CONTEXT)
            .to(this)
            .lock();
    }
}
exports.RequestContext = RequestContext;
//# sourceMappingURL=request-context.js.map