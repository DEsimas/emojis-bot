import { Command } from "./_Command";
export declare class ImgToAscII extends Command {
    private readonly widthParam;
    private readonly path;
    private options;
    execute(): Promise<void>;
    private parseParams;
}
