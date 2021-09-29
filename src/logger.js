import colors from "colors";

export function logError (text, data) {
    if(data)
        console.log((new Date().toString()+":").gray, (text+"\n").red, data, "\n");
    else
        console.log((new Date().toString()+":").gray, (text+"\n").red);
};

export function logWarning (text, data) {
    if(data)
        console.log((new Date().toString()+":").gray, (text+"\n").brightYellow, data, "\n");
    else
        console.log((new Date().toString()+":").gray, (text+"\n").brightYellow);
};

export function logInfo (text) {
    console.log((new Date().toString()+":").gray, (text+"\n").green);
};