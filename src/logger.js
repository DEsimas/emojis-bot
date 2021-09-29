const red = '\x1b[31m%s\x1b[0m';
const green = '\x1b[32m%s\x1b[0m';
const blue = '\x1b[34m%s\x1b[0m';
const cyan = '\x1b[36m%s\x1b[0m';

export function logError (text, data) {
    if(data)
        console.log(red, new Date().toString()+": " + text+"\n", data, "\n");
    else
        console.log(red, new Date().toString()+": " + text+"\n");
};

export function logWarning (text, data) {
    if(data)
        console.log(new Date().toString()+": " + text+"\n", data, "\n");
    else
        console.log(new Date().toString()+": " + text+"\n");
};

export function logInfo (text) {
    console.log(green, new Date().toString()+": " + text+"\n");
};