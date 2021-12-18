export class Log {
    private static readonly red = '\x1b[31m%s\x1b[0m';
    private static readonly green = '\x1b[32m%s\x1b[0m';
    private static readonly yellow = '\x1b[33m%s\x1b[0m';
    private static readonly blue = '\x1b[34m%s\x1b[0m';
    private static readonly magenta = '\x1b[35m%s\x1b[0m';
    private static readonly cyan = '\x1b[36m%s\x1b[0m';

    static error (message: string) {
        console.log(this.red, new Date().toString()+": " + message);
    };
    
    static warning (message:string) {
        console.log(this.yellow, new Date().toString()+": " + message);
    };
    
    static info (message: string) {
        console.log(this.blue, new Date().toString()+": " + message);
    };
};