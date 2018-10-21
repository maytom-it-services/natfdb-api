"use strict";
// Copyright IBM Corp. 2018. All Rights Reserved.
// Node module: @loopback/rest
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
const AJV = require("ajv");
const debugModule = require("debug");
const util = require("util");
const __1 = require("..");
const __2 = require("..");
const _ = require("lodash");
const toJsonSchema = require('openapi-schema-to-json-schema');
const debug = debugModule('loopback:rest:validation');
/**
 * Check whether the request body is valid according to the provided OpenAPI schema.
 * The JSON schema is generated from the OpenAPI schema which is typically defined
 * by `@requestBody()`.
 * The validation leverages AJS shema validator.
 * @param body The body data from an HTTP request.
 * @param requestBodySpec The OpenAPI requestBody specification defined in `@requestBody()`.
 * @param globalSchemas The referenced schemas generated from `OpenAPISpec.components.schemas`.
 */
function validateRequestBody(
// tslint:disable-next-line:no-any
body, requestBodySpec, globalSchemas) {
    if (!requestBodySpec)
        return;
    if (requestBodySpec.required && body == undefined) {
        const err = Object.assign(new __1.HttpErrors.BadRequest('Request body is required'), {
            code: 'MISSING_REQUIRED_PARAMETER',
            parameterName: 'request body',
        });
        throw err;
    }
    const schema = getRequestBodySchema(requestBodySpec);
    debug('Request body schema: %j', util.inspect(schema, { depth: null }));
    if (!schema)
        return;
    validateValueAgainstSchema(body, schema, globalSchemas);
}
exports.validateRequestBody = validateRequestBody;
/**
 * Get the schema from requestBody specification.
 * @param requestBodySpec The requestBody specification defined in `@requestBody()`.
 */
function getRequestBodySchema(requestBodySpec) {
    const content = requestBodySpec.content;
    // FIXME(bajtos) we need to find the entry matching the content-type
    // header from the incoming request (e.g. "application/json").
    return content[Object.keys(content)[0]].schema;
}
/**
 * Convert an OpenAPI schema to the corresponding JSON schema.
 * @param openapiSchema The OpenAPI schema to convert.
 */
function convertToJsonSchema(openapiSchema) {
    const jsonSchema = toJsonSchema(openapiSchema);
    delete jsonSchema['$schema'];
    debug('Converted OpenAPI schema to JSON schema: %s', util.inspect(jsonSchema, { depth: null }));
    return jsonSchema;
}
/**
 * Validate the request body data against JSON schema.
 * @param body The request body data.
 * @param schema The JSON schema used to perform the validation.
 * @param globalSchemas Schema references.
 */
const compiledSchemaCache = new WeakMap();
function validateValueAgainstSchema(
// tslint:disable-next-line:no-any
body, schema, globalSchemas) {
    let validate;
    if (compiledSchemaCache.has(schema)) {
        validate = compiledSchemaCache.get(schema);
    }
    else {
        validate = createValidator(schema, globalSchemas);
        compiledSchemaCache.set(schema, validate);
    }
    if (validate(body)) {
        debug('Request body passed AJV validation.');
        return;
    }
    const validationErrors = validate.errors;
    debug('Invalid request body: %s', util.inspect(validationErrors));
    const error = __2.RestHttpErrors.invalidRequestBody();
    error.details = _.map(validationErrors, e => {
        return {
            path: e.dataPath,
            code: e.keyword,
            message: e.message,
            info: e.params,
        };
    });
    throw error;
}
function createValidator(schema, globalSchemas) {
    const jsonSchema = convertToJsonSchema(schema);
    const schemaWithRef = Object.assign({ components: {} }, jsonSchema);
    schemaWithRef.components = {
        schemas: globalSchemas,
    };
    const ajv = new AJV({
        allErrors: true,
    });
    return ajv.compile(schemaWithRef);
}
//# sourceMappingURL=request-body.validator.js.map