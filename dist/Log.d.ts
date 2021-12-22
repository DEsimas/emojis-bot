export declare class Log {
    private static readonly red;
    private static readonly yellow;
    private static readonly blue;
    static error(origin: string, message: string, data?: any): void;
    static warning(origin: string, message: string, data?: any): void;
    static info(origin: string, message: string, data?: any): void;
}
