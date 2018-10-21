/// <reference types="express" />
import { ResolvedRoute } from './router/routing-table';
import { OperationArgs, Request } from './types';
export declare const QUERY_NOT_PARSED: {};
/**
 * Parses the request to derive arguments to be passed in for the Application
 * controller method
 *
 * @param request Incoming HTTP request
 * @param route Resolved Route
 */
export declare function parseOperationArgs(request: Request, route: ResolvedRoute): Promise<OperationArgs>;
