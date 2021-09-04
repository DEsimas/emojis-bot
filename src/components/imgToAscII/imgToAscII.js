export default class imgToAscII {
    constructor(context) {
        this.fs = context.fs;
        this.args = context.args;
        this.config = context.config;
        this.asciify = context.asciify;
        this.message = context.message;
        this.localization = context.config.localization[context.user.language];
        this.sendError = error => context.sendError(context, error);

        this.imgToAscII();
    };

    async imgToAscII() {
        const params = this.parceParams();
        const files = params.files;
        const options = params.options;

        if (files.length == 0) {
            this.sendError(this.localization.msg_imgToAscII_no_files);
            return;
        };

        //convert each file using image-to-ascii library
        files.forEach(async (el, index, array) => {
            this.asciify(el, options)
                .then((asciified) => {
                    // Print asciified image to console
                    this.fs.writeFileSync(this.config.ascII_file_name, asciified);
                    this.message.channel.send("", { files: [this.config.ascII_file_name] });
                })
                .catch((err) => {
                    // Print error to console
                    this.sendError(this.localization.msg_imgToAscII_wrong_file);
                });
        });
    };

    parceParams() {
        let files = [];
        let options = this.config.img_to_ascii_defaults;
        this.args.forEach((el, index, arr) => {
            if (el.includes(this.config.img_to_ascii_settings.width)) {
                el = el.slice(this.config.img_to_ascii_settings.width.length);
                options.width = Number(el);
            } else if (el.includes(this.config.img_to_ascii_settings.height)) {
                el = el.slice(this.config.img_to_ascii_settings.height.length);
                options.height = Number(el);
            } else if (index != 0) files.push(el);
        });

        this.message.attachments.forEach(el => {
            files.push(el.url);
        });

        return {
            files: files,
            options: options
        };
    };
};