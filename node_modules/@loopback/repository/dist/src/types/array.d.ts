import { Type } from './type';
/**
 * Array type, such as string[]
 */
export declare class ArrayType<T> implements Type<Array<T>> {
    itemType: Type<T>;
    constructor(itemType: Type<T>);
    readonly name = "array";
    isInstance(value: any): boolean;
    isCoercible(value: any): boolean;
    defaultValue(): Array<T>;
    coerce(value: any): any;
    serialize(value: Array<T> | null | undefined): any[] | null | undefined;
}
