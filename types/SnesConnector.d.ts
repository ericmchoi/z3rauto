declare type SnesRequest = {
    Opcode: string;
    Space: string;
    Flags?: string[];
    Operands?: string[];
};
declare class SnesConnector {
    private url;
    private timeout;
    private socket;
    private hasRequest;
    constructor(url: string, timeout: number);
    connect(): Promise<void>;
    sendRequest(request: SnesRequest, noReply?: boolean): Promise<unknown>;
    getDevices(): Promise<string[]>;
    attachToDevice(device: string): Promise<boolean>;
    getAddress(offset: number, size: number): Promise<ArrayBuffer>;
}
export default SnesConnector;
