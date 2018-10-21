import { Model } from '../model';
import { AnyObject, Options, Command, NamedParameters, PositionalParameters } from '../common-types';
/**
 * Common properties/operations for connectors
 */
export interface Connector {
    name: string;
    configModel?: Model;
    interfaces?: string[];
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    ping(): Promise<void>;
    execute?(command: Command, parameters: NamedParameters | PositionalParameters, options?: Options): Promise<AnyObject>;
}
