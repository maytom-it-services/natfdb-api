/// <reference types="express" />
import { Context } from '@loopback/context';
import { HandlerContext, Request, Response } from './types';
/**
 * A per-request Context combining an IoC container with handler context
 * (request, response, etc.).
 */
export declare class RequestContext extends Context implements HandlerContext {
    readonly request: Request;
    readonly response: Response;
    constructor(request: Request, response: Response, parent: Context, name?: string);
    private _setupBindings;
}
