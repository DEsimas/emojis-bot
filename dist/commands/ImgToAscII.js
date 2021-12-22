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
exports.ImgToAscII = void 0;
const asciifyImage = require("asciify-image");
const _Command_1 = require("./_Command");
class ImgToAscII extends _Command_1.Command {
    constructor() {
        super(...arguments);
        this.widthParam = "width:";
        this.path = "./ascII.txt";
        this.options = {
            fit: "box",
            width: 79,
            color: false
        };
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.args.length === 0) {
                this.sendError(this.localization.imgToAscII.no_files);
                return;
            }
            const files = this.parseParams();
            files.forEach((el) => __awaiter(this, void 0, void 0, function* () {
                if (!this.validateURL(el)) {
                    this.sendError(el + this.localization.imgToAscII.not_link);
                    return;
                }
                const asciified = yield asciifyImage(el, this.options).catch(() => this.sendError(this.localization.imgToAscII.wrong_file));
                if (typeof asciified === "string") {
                    let buf = Buffer.from(asciified);
                    this.message.channel.send({ files: [{ attachment: buf, name: "ascII.txt" }] }).catch(error => console.log(error));
                }
            }));
        });
    }
    parseParams() {
        const files = [];
        this.args.forEach((el, index) => {
            if (el.includes(this.widthParam)) {
                const width = Number(el.slice(this.widthParam.length));
                if (!isNaN(width))
                    this.options.width = width;
            }
            else if (index !== 0)
                files.push(el);
        });
        this.message.attachments.forEach(el => files.push(el.url));
        return files;
    }
}
exports.ImgToAscII = ImgToAscII;
//# sourceMappingURL=ImgToAscII.js.map