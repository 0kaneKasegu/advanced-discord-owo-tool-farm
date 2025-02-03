import { timeHandler } from "../utils/utils.js";
import { Commands } from "../typings/typings.js";

const infoCommand: Commands = {
    name: "info",
    description: "Tool Information",
    execute: (agent, message, ...args) => {
        const status = `Status:__ ${agent.captchaDetected ? agent.paused ? "**PAUSED**" : "**PENDING CAPTCHA**" : "HUNTING"}`;
        const summary = `__Total commands/texts sent:__ **${agent.totalCommands}/${agent.totalTexts}**`;
        const captchaSum = `__Total Captchas Resolved/Unsolved:__ **${agent.totalCaptcha.resolved}/${agent.totalCaptcha.unsolved}**`;
        const uptime = `__Total active time:__ ${timeHandler(agent.readyTimestamp ?? 0, Date.now())}`;
        message.reply([status, summary, uptime].join("\n"));
    }
}

export default infoCommand;