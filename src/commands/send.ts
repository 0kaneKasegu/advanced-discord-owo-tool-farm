import { Message } from "discord.js-selfbot-v13";
import { Commands } from "../typings/typings.js";

const sendCommand: Commands = {
    name: "send",
    description: "Send cash to someone",
    execute: (agent, message, ...args) => {
        try {
            if (message.channel.type == "DM" || message.channel.type == "GROUP_DM") return message.reply("You must send this command in a server")
            if (!args || args.length < 2) return message.reply("You must mention someone and amount of cowoncy")
            const target = message.mentions.members?.first()
            const owo = message.guild?.members.cache.get(agent.owoID)
            if (!target) return message.reply("You must mention an user to send cowoncy")
            if (!owo) return message.reply("OwO bot not found!")
            if (!args[1]?.match(/^[0-9]+$/)) return message.reply("You must include an amount of cowoncy to send")
            message.channel.send(`owo send <@!${target.id}> ${args[1]}`)
            message.channel.createMessageCollector({
                filter: (msg) => msg.author.id == agent.owoID && msg.embeds.length > 0 && msg.embeds[0].author?.name.includes(msg.guild?.members.me?.displayName!)! && msg.embeds[0].author?.name.includes(target.displayName)! && msg.components.length > 0,
                max: 1, time: 10_000
            }).once("collect", async (m) => { await m.clickButton({ X: 0, Y: 0 }) })
        } catch (error) {
            message.reply("Failed to Perform command")
            console.error(error)
        }
    }
}

export default sendCommand;