"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DAO = void 0;
const Notifications_1 = require("./Notifications");
const Avatars_1 = require("./Avatars");
const Servers_1 = require("./Servers");
const Users_1 = require("./Users");
const Logs_1 = require("./Logs");
const Log_1 = require("../Log");
const mongoose_1 = require("mongoose");
class DAO {
    static connect(uri) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, mongoose_1.connect)(uri, error => {
                if (error) {
                    Log_1.Log.error("DAO.ts", `Can't connect database`, { uri: uri, error: error });
                    return;
                }
                Log_1.Log.info("DAO.ts", "Database connected");
            });
        });
    }
}
exports.DAO = DAO;
DAO.Users = new Users_1.Users();
DAO.Avatars = new Avatars_1.Avatars();
DAO.Servers = new Servers_1.Servers();
DAO.Notifications = new Notifications_1.Notifications();
DAO.Logs = new Logs_1.Logs();
;
//# sourceMappingURL=DAO.js.map