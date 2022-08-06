import { Log } from "../../components/Log";
import { Command } from "./../Command";

export class ImgToAscII extends Command {
    private readonly sizeParam = "size:";
    private readonly charsParam = "chars:";

    private options: { chars: string, size: number } = { 
        chars: "##@%=+*:-. ",
        size: 100,
    }

    public async execute(): Promise<void> {
        if(this.args.length === 0) {
            this.sendError(this.localization.no_files)
            return;
        }

        const files = this.parseParams();

        files.forEach(async el => {
            if(!this.validateURL(el)) {
                this.sendError(el + this.localization.not_link);
                return;
            }

            const asciified = "uwu";

            if(typeof asciified === "string") {    
                let buf = Buffer.from(asciified);
                this.message.channel.send({ files: [{ attachment: buf, name: "ascII.txt" }] }).catch(error => Log.error("ImgToAscII.ts", "Error while sending asciified file", { text: asciified, buffer: buf, error: error }));
            }
        })
    }

    private parseParams(): string[] {
        const files: string[] = [];

        this.args.forEach((el, index) => {
            if(el.includes(this.sizeParam)) {
                const size = Number(el.slice(this.sizeParam.length));
                if(!isNaN(size))
                    this.options.size = size;
            } else if(el.includes(this.charsParam)) {
                const chars = el.slice(this.charsParam.length);
                this.options.chars = chars.replace("[space]", " ");
            } else if(index !== 0) {
                files.push(el);
            }
        });
        this.message.attachments.forEach(el => files.push(el.url));
        
        return files;
    }
}