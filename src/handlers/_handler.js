export default class Handler {
    constructor(data) {
        this.parseData(data);
    };

    //set received data to this
    parseData(data) {
        Object.keys(data).map(key => {
            this[key] = data[key];
        });
    };
};