"use strict";
// Copyright IBM Corp. 2017. All Rights Reserved.
// Node module: @loopback/rest
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@loopback/core");
const context_1 = require("@loopback/context");
const keys_1 = require("./keys");
const providers_1 = require("./providers");
const rest_server_1 = require("./rest.server");
const sequence_1 = require("./sequence");
const openapi_v3_types_1 = require("@loopback/openapi-v3-types");
let RestComponent = class RestComponent {
    constructor(app, config) {
        this.providers = {
            [keys_1.RestBindings.SequenceActions.LOG_ERROR.key]: providers_1.LogErrorProvider,
            [keys_1.RestBindings.SequenceActions.FIND_ROUTE.key]: providers_1.FindRouteProvider,
            [keys_1.RestBindings.SequenceActions.INVOKE_METHOD.key]: providers_1.InvokeMethodProvider,
            [keys_1.RestBindings.SequenceActions.REJECT.key]: providers_1.RejectProvider,
            [keys_1.RestBindings.BIND_ELEMENT.key]: providers_1.BindElementProvider,
            [keys_1.RestBindings.GET_FROM_CONTEXT.key]: providers_1.GetFromContextProvider,
            [keys_1.RestBindings.SequenceActions.PARSE_PARAMS.key]: providers_1.ParseParamsProvider,
            [keys_1.RestBindings.SequenceActions.SEND.key]: providers_1.SendProvider,
        };
        this.servers = {
            RestServer: rest_server_1.RestServer,
        };
        app.bind(keys_1.RestBindings.SEQUENCE).toClass(sequence_1.DefaultSequence);
        const apiSpec = openapi_v3_types_1.createEmptyApiSpec();
        // Merge the OpenAPI `servers` spec from the config into the empty one
        if (config && config.openApiSpec && config.openApiSpec.servers) {
            Object.assign(apiSpec, { servers: config.openApiSpec.servers });
        }
        app.bind(keys_1.RestBindings.API_SPEC).to(apiSpec);
    }
};
RestComponent = __decorate([
    __param(0, context_1.inject(core_1.CoreBindings.APPLICATION_INSTANCE)),
    __param(1, context_1.inject(keys_1.RestBindings.CONFIG)),
    __metadata("design:paramtypes", [core_1.Application, Object])
], RestComponent);
exports.RestComponent = RestComponent;
//# sourceMappingURL=rest.component.js.map