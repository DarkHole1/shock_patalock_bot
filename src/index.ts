import { Bot } from "grammy"
import { loadConfig } from "./config"
import * as cron from 'node-cron'

const config = loadConfig('./config.json')
const bot = new Bot(config.token)

bot.on('inline_query', async ctx => {
    console.log(ctx.inlineQuery)
    const res = await ctx.answerInlineQuery([{
        type: 'audio',
        id: 'patalock',
        audio_file_id: config.patalockFileId
    }])
    console.log(res)
})

async function sendShockPatalock() {
    await bot.api.sendAudio(config.patalockChatId, config.patalockFileId)
}

cron.schedule('0 0 13 * * *', () => {
    sendShockPatalock()
})
bot.start()