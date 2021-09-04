export default class readyHandler {
    constructor(context) {
        this.log = context.config.log;

        this.readyHandler();
    };

    readyHandler() {
        console.log(this.log.ready);
    };
};