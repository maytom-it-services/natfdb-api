/// <reference types="node" />
/// <reference types="express" />
import { BindingKey, Context } from '@loopback/context';
/**
 * See https://github.com/Microsoft/TypeScript/issues/26985
 */
import { OpenAPIObject as OpenApiSpec } from 'openapi3-ts';
import { HttpHandler } from './http-handler';
import { SequenceHandler } from './sequence';
import { BindElement, FindRoute, GetFromContext, InvokeMethod, LogError, Request, Response, ParseParams, Reject, Send } from './types';
import { HttpProtocol } from '@loopback/http-server';
import * as https from 'https';
import { ErrorWriterOptions } from 'strong-error-handler';
import { RestRouter } from './router';
/**
 * RestServer-specific bindings
 */
export declare namespace RestBindings {
    /**
     * Binding key for setting and injecting RestComponentConfig
     */
    const CONFIG: BindingKey<{}>;
    /**
     * Binding key for setting and injecting the host name of RestServer
     */
    const HOST: BindingKey<string | undefined>;
    /**
     * Binding key for setting and injecting the port number of RestServer
     */
    const PORT: BindingKey<number>;
    /**
     * Binding key for setting and injecting the URL of RestServer
     */
    const URL: BindingKey<string>;
    /**
     * Binding key for setting and injecting the protocol of RestServer
     */
    const PROTOCOL: BindingKey<HttpProtocol>;
    /**
     * Binding key for HTTPS options
     */
    const HTTPS_OPTIONS: BindingKey<https.ServerOptions>;
    /**
     * Internal binding key for http-handler
     */
    const HANDLER: BindingKey<HttpHandler>;
    /**
     * Internal binding key for rest router
     */
    const ROUTER: BindingKey<RestRouter>;
    /**
     * Binding key for setting and injecting Reject action's error handling
     * options.
     *
     * See https://github.com/strongloop/strong-error-handler#options for
     * the list of available options. Please note that the flag `log` is not used
     * by `@loopback/rest`.
     */
    const ERROR_WRITER_OPTIONS: BindingKey<ErrorWriterOptions>;
    /**
     * Binding key for setting and injecting an OpenAPI spec
     */
    const API_SPEC: BindingKey<OpenApiSpec>;
    /**
     * Binding key for setting and injecting a Sequence
     */
    const SEQUENCE: BindingKey<SequenceHandler>;
    /**
     * Bindings for potential actions that could be used in a sequence
     */
    namespace SequenceActions {
        /**
         * Binding key for setting and injecting a route finding function
         */
        const FIND_ROUTE: BindingKey<FindRoute>;
        /**
         * Binding key for setting and injecting a parameter parsing function
         */
        const PARSE_PARAMS: BindingKey<ParseParams>;
        /**
         * Binding key for setting and injecting a controller route invoking function
         */
        const INVOKE_METHOD: BindingKey<InvokeMethod>;
        /**
         * Binding key for setting and injecting an error logging function
         */
        const LOG_ERROR: BindingKey<LogError>;
        /**
         * Binding key for setting and injecting a response writing function
         */
        const SEND: BindingKey<Send>;
        /**
         * Binding key for setting and injecting a bad response writing function
         */
        const REJECT: BindingKey<Reject>;
    }
    /**
     * Binding key for setting and injecting a wrapper function for retrieving
     * values from a given context
     */
    const GET_FROM_CONTEXT: BindingKey<GetFromContext>;
    /**
     * Binding key for setting and injecting a wrapper function for setting values
     * on a given context
     */
    const BIND_ELEMENT: BindingKey<BindElement>;
    /**
     * Request-specific bindings
     */
    namespace Http {
        /**
         * Binding key for setting and injecting the http request
         */
        const REQUEST: BindingKey<Request>;
        /**
         * Binding key for setting and injecting the http response
         */
        const RESPONSE: BindingKey<Response>;
        /**
         * Binding key for setting and injecting the http request context
         */
        const CONTEXT: BindingKey<Context>;
    }
}
