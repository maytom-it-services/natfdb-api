"use strict";
// Copyright IBM Corp. 2017. All Rights Reserved.
// Node module: @loopback/rest
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
const parser_1 = require("../parser");
/**
 * Provides the function for parsing args in requests at runtime.
 *
 * @export
 * @class ParseParamsProvider
 * @implements {Provider<BoundValue>}
 * @returns {BoundValue} The handler function that will parse request args.
 */
class ParseParamsProvider {
    value() {
        return parser_1.parseOperationArgs;
    }
}
exports.ParseParamsProvider = ParseParamsProvider;
//# sourceMappingURL=parse-params.provider.js.map