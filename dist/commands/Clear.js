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
exports.Clear = void 0;
const Log_1 = require("../Log");
const _Command_1 = require("./_Command");
class Clear extends _Command_1.Command {
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            let limit = this.getLimit();
            this.message.channel.messages.fetch({ limit: 100 }).then(messages => {
                messages.forEach(element => {
                    var _a;
                    if ((element.author.id === ((_a = this.client.user) === null || _a === void 0 ? void 0 : _a.id)) && (limit > 0)) {
                        element.delete();
                        limit--;
                    }
                });
            }).catch(error => {
                this.sendError(this.localization.clear.error);
                Log_1.Log.error("Clear.ts", "Epic clear fail", { error: error, limit: limit });
            });
        });
    }
    getLimit() {
        if ((isNaN(Number(this.args[1]))) || Number(this.args[1]) <= 0)
            return 100;
        return Number(this.args[1]);
    }
}
exports.Clear = Clear;
//# sourceMappingURL=Clear.js.map