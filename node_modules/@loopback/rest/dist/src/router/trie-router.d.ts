/// <reference types="express" />
import { RouteEntry } from './routing-table';
import { Request } from '../types';
import { BaseRouter } from './router-base';
/**
 * Router implementation based on trie
 */
export declare class TrieRouter extends BaseRouter {
    private trie;
    protected addRouteWithPathVars(route: RouteEntry): void;
    protected findRouteWithPathVars(request: Request): import("./routing-table").ResolvedRoute | undefined;
    protected listRoutesWithPathVars(): RouteEntry[];
}
