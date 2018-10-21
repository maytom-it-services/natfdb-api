import { Component, ProviderMap, Server, Application } from '@loopback/core';
import { Constructor } from '@loopback/context';
import { RestServerConfig } from './rest.server';
export declare class RestComponent implements Component {
    providers: ProviderMap;
    servers: {
        [name: string]: Constructor<Server>;
    };
    constructor(app: Application, config?: RestComponentConfig);
}
export declare type RestComponentConfig = RestServerConfig;
