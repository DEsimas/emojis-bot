"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Log = void 0;
const DAO_1 = require("./database/DAO");
class Log {
    static error(origin, message, data) {
        console.log(this.red, origin + " -> " + message);
        DAO_1.DAO.Logs.insertOne({
            type: "error",
            time: new Date(),
            origin: origin,
            message: message,
            payload: JSON.stringify(data)
        });
    }
    ;
    static warning(origin, message, data) {
        console.log(this.yellow, origin + " -> " + message);
        DAO_1.DAO.Logs.insertOne({
            type: "warning",
            time: new Date(),
            origin: origin,
            message: message,
            payload: JSON.stringify(data)
        });
    }
    ;
    static info(origin, message, data) {
        console.log(this.blue, origin + " -> " + message);
        DAO_1.DAO.Logs.insertOne({
            type: "info",
            time: new Date(),
            origin: origin,
            message: message,
            payload: JSON.stringify(data)
        });
    }
    ;
}
exports.Log = Log;
Log.red = '\x1b[31m%s\x1b[0m';
Log.yellow = '\x1b[33m%s\x1b[0m';
Log.blue = '\x1b[34m%s\x1b[0m';
;
//# sourceMappingURL=Log.js.map