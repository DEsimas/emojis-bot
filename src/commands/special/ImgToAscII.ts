import asciifyImage = require("asciify-image");
import { Command } from "./../_Command";

export class ImgToAscII extends Command {
    private readonly widthParam = "width:";

    private options: { fit: "box" | "width" | "height", width: number, color: boolean } = { 
        fit: "box",
        width: 79,
        color: false
    }

    public override async execute(): Promise<void> {
        if(this.args.length === 0) {
            this.sendError(this.localization.imgToAscII.no_files)
            return;
        }

        const files = this.parseParams();

        files.forEach(async el => {
            if(!this.validateURL(el)) {
                this.sendError(el + this.localization.imgToAscII.not_link);
                return;
            }

            const asciified = await asciifyImage(el, this.options).catch(() => this.sendError(this.localization.imgToAscII.wrong_file));

            if(typeof asciified === "string") {    
                let buf = Buffer.from(asciified);
                this.message.channel.send({ files: [{ attachment: buf, name: "ascII.txt" }] }).catch(error => console.log(error));
            }

        })
    }

    private parseParams(): string[] {
        const files: string[] = [];

        this.args.forEach((el, index) => {
            if(el.includes(this.widthParam)) {
                const width = Number(el.slice(this.widthParam.length));
                if(!isNaN(width))
                    this.options.width = width;
            } else if(index !== 0) files.push(el);
        });
        this.message.attachments.forEach(el => files.push(el.url));
        
        return files;
    }
}