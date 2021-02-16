import SnesConnector from './SnesConnector';
declare type Item = {
    id: string;
    name: string;
    isFound: boolean;
};
declare type Equip = {
    id: string;
    name: string;
    level: number;
};
declare type Key = {
    id: string;
    name: string;
    count: number;
};
declare type BigKey = {
    id: string;
    name: string;
    isFound: boolean;
};
declare type Location = {
    id: string;
    name: string;
    isChecked: boolean;
};
declare type TrackedValues<T> = {
    [key: string]: T;
};
declare class Z3rAuto extends SnesConnector {
    private sram;
    private gameStatus;
    constructor(url?: string, timeout?: number);
    update(): Promise<void>;
    get status(): number;
    get items(): TrackedValues<Item>;
    get equips(): TrackedValues<Equip>;
    get keys(): TrackedValues<Key>;
    get bigKeys(): TrackedValues<BigKey>;
    get locations(): TrackedValues<Location>;
}
export default Z3rAuto;
