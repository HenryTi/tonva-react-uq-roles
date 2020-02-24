/// <reference types="react" />
import { LocalMap, LocalCache } from '../tool';
import { UqData } from '../net';
import { UqMan } from './uqMan';
export interface TVs {
    [uqName: string]: {
        [tuidName: string]: (values: any) => JSX.Element;
    };
}
export declare class UQsMan {
    private collection;
    private readonly tvs;
    readonly name: string;
    readonly appOwner: string;
    readonly appName: string;
    readonly localMap: LocalMap;
    readonly localData: LocalCache;
    id: number;
    constructor(tonvaAppName: string, tvs: TVs);
    addUq(uq: UqMan): void;
    private buildTVs;
    init(uqsData: UqData[]): Promise<void>;
    load(): Promise<string[]>;
    buildUQs(): any;
    private showReload;
    setTuidImportsLocal(): string[];
    private setInner;
}
