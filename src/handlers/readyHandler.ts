import { UserInterfaceUpdater } from "../components/UserInterfaceUpdater";
import { NotificationsSender } from "../components/NotificationsSender";
import { Log } from "../Log";

import { EventHandler } from "./_EventHandler";

export class ReadyHandler extends EventHandler {
    private readonly cron: Record<string, string> = {
        notifications: "0 0 * * *",
        UI: "*/5 * * * *"
    }
    
    public override async handle(): Promise<void> {
        Log.info("ReadyHandler.ts", "bot is ready");
        const sender = new NotificationsSender(this.client);
        sender.getTask(this.cron.notifications).start();

        const updater = new UserInterfaceUpdater(this.client);
        updater.getTask(this.cron.UI).start();
    }
};