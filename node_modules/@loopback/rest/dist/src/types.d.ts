import { Binding, BoundValue } from '@loopback/context';
import { ResolvedRoute, RouteEntry } from './router/routing-table';
import { Request, Response } from 'express';
export { Request, Response };
/**
 * An object holding HTTP request, response and other data
 * needed to handle an incoming HTTP request.
 */
export interface HandlerContext {
    readonly request: Request;
    readonly response: Response;
}
/**
 * Find a route matching the incoming request.
 * Throw an error when no route was found.
 */
export declare type FindRoute = (request: Request) => ResolvedRoute;
/**
 *
 */
export declare type ParseParams = (request: Request, route: ResolvedRoute) => Promise<OperationArgs>;
/**
 * Invokes a method defined in the Application Controller
 *
 * @param controller Name of end-user's application controller
 *  class which defines the methods.
 * @param method Method name in application controller class
 * @param args Operation arguments for the method
 * @returns OperationRetval Result from method invocation
 */
export declare type InvokeMethod = (route: RouteEntry, args: OperationArgs) => Promise<OperationRetval>;
/**
 * Send the operation response back to the client.
 *
 * @param response The response the response to send to.
 * @param result The operation result to send.
 */
export declare type Send = (response: Response, result: OperationRetval) => void;
/**
 * Reject the request with an error.
 *
 * @param handlerContext The context object holding HTTP request, response
 * and other data  needed to handle an incoming HTTP request.
 * @param err The error.
 */
export declare type Reject = (handlerContext: HandlerContext, err: Error) => void;
/**
 * Log information about a failed request.
 *
 * @param err The error reported by request handling code.
 * @param statusCode Status code of the HTTP response
 * @param request The request that failed.
 */
export declare type LogError = (err: Error, statusCode: number, request: Request) => void;
export declare type PathParameterValues = {
    [key: string]: any;
};
export declare type OperationArgs = any[];
/**
 * Return value of a controller method (a function implementing an operation).
 * This is a type alias for "any", used to distinguish
 * operation results from other "any" typed values.
 */
export declare type OperationRetval = any;
export declare type GetFromContext = (key: string) => Promise<BoundValue>;
export declare type BindElement = (key: string) => Binding;
