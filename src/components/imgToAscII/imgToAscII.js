export default class imgToAscII {
    constructor(context) {
        this.ImgToAscII = context.ImgToAscII;
        this.args = context.args;
        this.config = context.config;
        this.message = context.message;
        this.localization = context.config.localization[context.user.language];
        this.sendError = error => context.sendError(context, error);
        
        this.imgToAscII();
    };

    imgToAscII() {
        const params = this.parceParams();
        const files = params.files;
        const options = params.options;

        if (files.length == 0) {
            this.sendError(this.localization.msg_imgToAscII_no_files);
            return;
        };

        //convert each file using image-to-ascii library
        files.forEach((el, index, array) => {
            this.ImgToAscII(el, options, (err, converted) => {
                if (err) {
                    this.sendError(this.localization.msg_imgToAscII_error);
                    return;
                };

                console.log(converted);
            });
        });
    };

    parceParams() {
        let files = [];
        let options = { ...this.config.img_to_ascii_defaults };
        this.args.forEach((el, index, arr) => {
            if (el.includes(this.config.img_to_ascii_settings.pixels)) {
                el = el.slice(this.config.img_to_ascii_settings.pixels.length);
                el = el.replace(this.config.space_code, ' ');
                options.pixels = el.split("");
            } else if (el.includes(this.config.img_to_ascii_settings.width)) {
                el = el.slice(this.config.img_to_ascii_settings.width.length);
                options.size.width = Number(el);
            } else if (el.includes(this.config.img_to_ascii_settings.height)) {
                el = el.slice(this.config.img_to_ascii_settings.height.length);
                options.size.height = Number(el);
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