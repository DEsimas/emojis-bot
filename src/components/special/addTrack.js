import config from "../../config.js";
import Command from "./../command.js";
import fetch from 'node-fetch';

export default class addTrack extends Command {
    constructor(data) {
        super(data);
        this.addTrack();
    };

    validateURL(str) {
        var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
        return !!pattern.test(str);
    };

    validate() {
        if (this.message.author.id !== config.mous999_id) {
            super.sendError(this.localization.msg_addTrack_no_maus999);
            return 0;
        };

        if (this.args.length <= 1) {
            super.sendError(this.localization.msg_addTrack_no_args);
            return 0;
        };

        return 1;
    };

    async sendResult() {
        this.tracks.forEach(track => {
            fetch(config.maus999_server_url, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                  method: "POST",
                  body: JSON.stringify({ url: track, date: new Date() })
            });
        });

        super.sendSuccess(this.localization.msg_addTrack_success);
    };

    addTrack() {
        if (!this.validate()) return;

        this.tracks = [];
        let wrong = [];

        this.args.forEach((el, index) => {
            if (!index) return;
            if (this.validateURL(el)) this.tracks.push(el);
            else wrong.push(el);
        });

        if (wrong.length !== 0) {
            wrong.forEach(track => {
                super.sendError(track + this.localization.msg_addTrack_transaction_denied);
            })
            return;
        }

        this.sendResult();
    };
};