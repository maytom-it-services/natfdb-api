"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpErrors = require("http-errors");
var RestHttpErrors;
(function (RestHttpErrors) {
    function invalidData(data, name, extraProperties) {
        const msg = `Invalid data ${JSON.stringify(data)} for parameter ${name}!`;
        return Object.assign(new HttpErrors.BadRequest(msg), {
            code: 'INVALID_PARAMETER_VALUE',
            parameterName: name,
        }, extraProperties);
    }
    RestHttpErrors.invalidData = invalidData;
    function missingRequired(name) {
        const msg = `Required parameter ${name} is missing!`;
        return Object.assign(new HttpErrors.BadRequest(msg), {
            code: 'MISSING_REQUIRED_PARAMETER',
            parameterName: name,
        });
    }
    RestHttpErrors.missingRequired = missingRequired;
    function invalidParamLocation(location) {
        const msg = `Parameters with "in: ${location}" are not supported yet.`;
        return new HttpErrors.NotImplemented(msg);
    }
    RestHttpErrors.invalidParamLocation = invalidParamLocation;
    RestHttpErrors.INVALID_REQUEST_BODY_MESSAGE = 'The request body is invalid. See error object `details` property for more info.';
    function invalidRequestBody() {
        return Object.assign(new HttpErrors.UnprocessableEntity(RestHttpErrors.INVALID_REQUEST_BODY_MESSAGE), {
            code: 'VALIDATION_FAILED',
        });
    }
    RestHttpErrors.invalidRequestBody = invalidRequestBody;
})(RestHttpErrors = exports.RestHttpErrors || (exports.RestHttpErrors = {}));
//# sourceMappingURL=rest-http-error.js.map