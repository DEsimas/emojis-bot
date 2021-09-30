const red = '\x1b[31m%s\x1b[0m';
const green = '\x1b[32m%s\x1b[0m';
const yellow = '\x1b[33m%s\x1b[0m';
const blue = '\x1b[34m%s\x1b[0m';
const magenta = '\x1b[35m%s\x1b[0m';
const cyan = '\x1b[36m%s\x1b[0m';
export default class Log {
    static error (text, data) {
        if(data)
            console.log(red, new Date().toString()+": " + text+"\n", data, "\n");
        else
            console.log(red, new Date().toString()+": " + text+"\n");
    };
    
    static warning (text, data) {
        if(data)
            console.log(yellow, new Date().toString()+": " + text+"\n", data, "\n");
        else
            console.log(yellow, new Date().toString()+": " + text+"\n");
    };
    
    static info (text) {
        console.log(blue, new Date().toString()+": " + text+"\n");
    };
};