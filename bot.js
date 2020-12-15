class Context {
    params = {
    };
    constructor(bot, update1){
        this.bot = bot;
        this.update = update1;
    }
    async reply(data, options) {
        return await this.bot.telegram.sendMessage({
            chat_id: this.update[this.update.type].chat.id,
            text: data,
            reply_to_message_id: this.update[this.update.type].message_id,
            ...options
        });
    }
    async send(data, options) {
        return await this.bot.telegram.sendMessage({
            chat_id: this.update[this.update.type].chat.id,
            text: data,
            ...options
        });
    }
}
class Telegram {
    constructor(token, options1 = {
        fetcher: fetch
    }){
        this.token = token;
        this.endPoint = `https://api.telegram.org/bot${token}`;
        this.fetch = options1.fetcher;
    }
    async Get(method, options) {
        const url = new URL(`${this.endPoint}/${method}`);
        options && Object.keys(options).forEach((key)=>url.searchParams.append(key, options[key])
        );
        return await this.fetch(url);
    }
    async Post(method, options) {
        const fData = new FormData();
        Object.keys(options).map((o)=>{
            fData.append(o, options[o], [
                'photo',
                'document',
                'audio',
                'video'
            ].includes(o) ? options.title || 'file' : undefined);
        });
        return await fetch(`${this.endPoint}/${method}`, {
            method: 'POST',
            headers: {
                "connection": "keep-alive"
            },
            body: fData
        });
    }
    async getMe() {
        return await this.Get('getMe');
    }
    async getMyCommands() {
        return await this.Get('getMyCommands');
    }
    async setMyCommands(options) {
        return await this.Get('setMyCommands', options);
    }
    async sendMessage(options) {
        return await this.Get('sendMessage', options);
    }
    async forwardMessage(options) {
        return await this.Get('forwardMessage', options);
    }
    async copyMessage(options) {
        return await this.Get('copyMessage', options);
    }
    async sendPhoto(options) {
        return await this.Post('sendPhoto', options);
    }
    async sendDocument(options) {
        return await this.Post('sendDocument', options);
    }
    async sendAudio(options) {
        return await this.Post('sendAudio', options);
    }
    async sendVideo(options) {
        return await this.Post('sendVideo', options);
    }
    async sendAnimation(options) {
        return await this.Post('sendAnimation', options);
    }
    async sendVoice(options) {
        return await this.Post('sendVoice', options);
    }
    async sendVideoNote(options) {
        return await this.Post('sendVideoNote', options);
    }
    async sendMediaGroup(options) {
        return await this.Post('sendMediaGroup', options);
    }
}
const update_types = [
    'callback_query',
    'channel_post',
    'chosen_inline_result',
    'edited_channel_post',
    'edited_message',
    'inline_query',
    'message',
    'pre_checkout_query',
    'shipping_query',
    'poll',
    'poll_answer', 
];
const message_sub_types = [
    'voice',
    'video_note',
    'video',
    'animation',
    'venue',
    'text',
    'supergroup_chat_created',
    'successful_payment',
    'sticker',
    'pinned_message',
    'photo',
    'new_chat_title',
    'new_chat_photo',
    'new_chat_members',
    'migrate_to_chat_id',
    'migrate_from_chat_id',
    'location',
    'left_chat_member',
    'invoice',
    'group_chat_created',
    'game',
    'dice',
    'document',
    'delete_chat_photo',
    'contact',
    'channel_chat_created',
    'audio',
    'connected_website',
    'passport_data',
    'poll', 
];
function isIterable(obj) {
    if (obj == null || typeof obj == 'string') return false;
    return typeof obj[Symbol.iterator] === 'function';
}
class Middleware {
    constructor(context){
        this.ctx = context;
    }
    use(fn) {
        var self = this;
        this.go = (function(stack) {
            return (function(next) {
                stack.call(self, function() {
                    fn.call(self, self.ctx, next.bind(self));
                });
            }).bind(this);
        })(this.go);
    }
    go(next) {
        next();
    }
}
String.prototype.equal = function(str) {
    return {
        match: this == str,
        result: [
            str
        ]
    };
};
RegExp.prototype.equal = function(str) {
    return {
        match: this.test(str),
        result: this.exec(str)
    };
};
export default class Bottie {
    rules = [];
    middlewares = [];
    offset = 0;
    constructor(token1, options2 = {
        timeout: 120
    }){
        this.token = token1;
        this.telegram = new Telegram(token1);
        this.options = options2;
    }
    handle(update) {
        this.offset = update.update_id + 1;
        update_types.forEach((type)=>{
            if (type in update) {
                update.type = type;
            }
        });
        message_sub_types.forEach((type)=>{
            if (type in update[update.type]) {
                update.subType = type;
            }
        });
        this.rules.forEach((rule)=>{
            const Mi = new Middleware(new Context(this, update));
            this.middlewares.forEach((mw)=>Mi.use(mw)
            );
            if (rule.subType == 'text') {
                if (rule.value == null || rule.value.equal(update[update.type]['text']).match) {
                    update.result = rule.value.equal(update[update.type]['text']).result;
                    rule.callback.forEach((callback)=>Mi.use(callback)
                    );
                    Mi.go(()=>true
                    );
                }
            } else {
                if ((rule.type == update.type || update.type == null) && (rule.subType == update.subType || update.subType == null)) {
                    rule.callback.forEach((callback)=>Mi.use(callback)
                    );
                    Mi.go(()=>true
                    );
                }
            }
        });
        return update;
    }
    async poll() {
        let req = await this.telegram.Get('getUpdates', {
            offset: this.offset,
            timeout: this.options.timeout
        });
        if (req.status == 502) {
            await this.poll();
        } else if (req.status != 200) {
            console.error(await req.json());
            await new Promise((resolve)=>setTimeout(resolve, 1000)
            );
            await this.poll();
        } else {
            let data = await req.json();
            data.ok ? data.result.forEach((req1)=>this.handle(req1)
            ) : console.error(data);
            await this.poll();
        }
    }
    text(text, ...callback) {
        if (isIterable(text)) {
            text.map((t)=>{
                this.rules.push({
                    callback,
                    subType: 'text',
                    type: null,
                    value: t
                });
            });
        } else {
            this.rules.push({
                callback,
                subType: 'text',
                type: null,
                value: text
            });
        }
    }
    regex(regex, ...callback) {
        if (isIterable(regex)) {
            regex.map((r)=>{
                this.rules.push({
                    callback,
                    subType: 'text',
                    type: null,
                    value: r
                });
            });
        } else {
            this.rules.push({
                callback,
                subType: 'text',
                type: null,
                value: regex
            });
        }
    }
    use(...callbacks) {
        callbacks.forEach((cb)=>this.middlewares.push(cb)
        );
    }
    launch() {
        this.poll();
    }
};

