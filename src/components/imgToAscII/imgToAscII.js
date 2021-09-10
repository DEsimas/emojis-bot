import asciifyImage from "asciify-image";
import fs from "fs";

import config from "./../../config.js";
import Command from "./../command.js";

export default class imgToAscII extends Command {
    constructor(data) {
        super(data);

        this.parseParams();
        if(this.validate()) this.imgToAscII();
    };

    //main function
    async imgToAscII() {
        //convert each file using image-to-ascii library
        this.files.forEach(async (el, index, array) => {
            const asciified = await asciifyImage(el, this.options).catch(err => super.sendError(this.localization.msg_imgToAscII_wrong_file));

            //Send asiified image
            fs.writeFileSync(config.ascII_file_name, asciified);
            this.message.channel.send({ files: [config.ascII_file_name] });
        });
    };

    //parse params ¯\_(ツ)_/¯
    parseParams() {
        //declare vars with params
        this.files = [];
        this.options = config.img_to_ascii_defaults;

        //iterate through message and take files and options
        this.args.forEach((el, index, array) => this.parseArgument(el, index, array));
        this.message.attachments.forEach(el => this.files.push(el.url));
    };

    //if el contains width or height or link from argument
    parseArgument(el, index, array) {
        if (el.includes(config.img_to_ascii_settings.width)) {
            // el = el.slice(config.img_to_ascii_settings.width.length);
            // this.options.width = Number(el);
        } else if (el.includes(config.img_to_ascii_settings.height)) {
            // el = el.slice(config.img_to_ascii_settings.height.length);
            // this.options.height = Number(el);
        } else if (index != 0) this.files.push(el);
    };

    //validate received
    validate() {
        //if we have no files after parsing send false
        if (this.files.length == 0) {
            super.sendError(this.localization.msg_imgToAscII_no_files);
            return false;
        };

        return true;
    };
};