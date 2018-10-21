import { Provider, BoundValue } from '@loopback/context';
import { parseOperationArgs } from '../parser';
/**
 * Provides the function for parsing args in requests at runtime.
 *
 * @export
 * @class ParseParamsProvider
 * @implements {Provider<BoundValue>}
 * @returns {BoundValue} The handler function that will parse request args.
 */
export declare class ParseParamsProvider implements Provider<BoundValue> {
    value(): typeof parseOperationArgs;
}
