import Bottie from './bot.ts'

export default class Context{
    bot : Bottie
    update : any
    params = {}
    constructor(bot : Bottie, update : any){
        this.bot = bot
        this.update = update
    }

    async reply(data : any, options? : object){
        return await this.bot.telegram.sendMessage({
            chat_id : this.update[this.update.type].chat.id,
            text : data,
            reply_to_message_id : this.update[this.update.type].message_id,
            ...options
        })
    }

    async send(data : any, options? : object){
        return await this.bot.telegram.sendMessage({
            chat_id : this.update[this.update.type].chat.id,
            text : data,
            ...options
        })
    }

}