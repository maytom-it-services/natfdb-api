import { RequestBodyObject, SchemasObject } from '@loopback/openapi-v3-types';
/**
 * Check whether the request body is valid according to the provided OpenAPI schema.
 * The JSON schema is generated from the OpenAPI schema which is typically defined
 * by `@requestBody()`.
 * The validation leverages AJS shema validator.
 * @param body The body data from an HTTP request.
 * @param requestBodySpec The OpenAPI requestBody specification defined in `@requestBody()`.
 * @param globalSchemas The referenced schemas generated from `OpenAPISpec.components.schemas`.
 */
export declare function validateRequestBody(body: any, requestBodySpec: RequestBodyObject | undefined, globalSchemas?: SchemasObject): void;
