export default class rule34 {
    constructor(context) {
        this.R34 = context.R34;
        this.args = context.args;
        this.config = context.config;
        this.message = context.message;
        this.links_per_message = context.config.links_per_message;
        this.localization = context.config.localization[context.user.language];
        this.sendError = error => context.sendError(context, error);

        this.rule34();
    };

    rule34() {
        if(!this.message.channel.nsfw) {
            this.sendError(this.localization.msg_ruel34_nsfw_error);
            return;
        }

        const options = this.parseArgs();

        if (!options.tags.length) {
            this.sendError(this.localization.msg_rule34_tag_error);
            return;
        }

        //request to rule34.xxx
        this.R34.posts({ tags: options.tags })
            .then(response => this.responseHandler(response, options))
            .catch(err => this.sendError(this.localization.msg_rule34_fetch_error));

    };

    //get tags and amount of images from arguments
    parseArgs() {
        let limit = 1;
        let tags = [];
        this.args.forEach((element, index) => {
            if (!index) return;
            if (!isNaN(element)) {
                limit = Number(element);
                return;
            };

            tags.push(element);
        });

        if(limit > this.config.rule34_publication_limit) limit = this.config.rule34_publication_limit;

        return {
            tags: tags,
            limit: limit
        };
    };

    //handle responser from r34
    responseHandler(response, options) {
        if (!response.count) {
            this.sendError(this.localization.msg_rule34_hentai_not_found);
            return;
        };

        const posts = response.posts.constructor === Array ? response.posts : [response.posts];

        this.sendImages(this.shuffle(posts), response.count <= options.limit ? response.posts.length : options.limit);
    };

    //sending images several in each message for optimization
    sendImages(posts, limit) {
        let msg = "";
        posts.forEach((el, index) => {
            if (index >= limit) return;

            msg += (el.file_url + '\n');
            if ((index + 1) % this.links_per_message == 0) {
                this.message.channel.send(msg);
                msg = "";
            };
        });

        if (msg) this.message.channel.send(msg);

        if (limit >= 10) this.message.channel.send(this.message.url);
    };

    //array shuffler for random output (not mine)
    shuffle(array) {
        let counter = array.length;

        // While there are elements in the array
        while (counter > 0) {
            // Pick a random index
            let index = Math.floor(Math.random() * counter);

            // Decrease counter by 1
            counter--;

            // And swap the last element with it
            let temp = array[counter];
            array[counter] = array[index];
            array[index] = temp;
        }

        return array;
    }
};