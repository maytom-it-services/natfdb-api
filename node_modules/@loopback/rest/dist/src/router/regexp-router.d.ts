/// <reference types="express" />
import { RouteEntry, ResolvedRoute } from './routing-table';
import { Request } from '../types';
import pathToRegExp = require('path-to-regexp');
import { BaseRouter } from './router-base';
/**
 * Route entry with path-to-regexp
 */
interface RegExpRouteEntry extends RouteEntry {
    regexp: RegExp;
    keys: pathToRegExp.Key[];
}
/**
 * Router implementation based on regexp matching
 */
export declare class RegExpRouter extends BaseRouter {
    private routes;
    private _sorted;
    private _sort;
    protected addRouteWithPathVars(route: RouteEntry): void;
    protected findRouteWithPathVars(request: Request): ResolvedRoute | undefined;
    protected listRoutesWithPathVars(): RegExpRouteEntry[];
    private _buildPathParams;
}
export {};
