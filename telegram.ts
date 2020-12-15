import { ChatId } from "./types.a.ts"
import { CopyMessageOptions, ForwardMessageOptions, SendAnimationOptions, SendAudioOptions, SendDocumentOptions, SendMediaGroupOptions, SendMessageOptions, SendPhotoOptions, SendVideoNoteOptions, SendVideoOptions, SendVoiceOptions, SetMyCommandsOptions } from "./types.t.ts"



export default class Telegram{
    token : string
    endPoint : string
    fetch : any
    constructor(token : string, options={fetcher : fetch}){
        this.token = token
        this.endPoint = `https://api.telegram.org/bot${token}`
        this.fetch = options.fetcher
    }

    async Get(method : string, options? : any){
        const url = new URL(`${this.endPoint}/${method}`);
        ( options && Object.keys(options).forEach(key => url.searchParams.append(key, options[key])) )
        return await this.fetch(url)//.then((d:any)=>d.json()).then((d : any) => d.ok?d.result:console.error(d)).catch((err:any) => console.error(err));
    }

    private async Post(method : string, options? : any){
        const fData = new FormData()
        Object.keys(options).map(o => {fData.append(o, options[o], ['photo', 'document', 'audio', 'video'].includes(o) ? options.title || 'file' : undefined)})
        return await fetch(`${this.endPoint}/${method}`, {
            method : 'POST', 
            headers : {
                "connection": "keep-alive"
            },
            body : fData
        })
    }

    async getMe(){
        return await this.Get('getMe')
    }

    async getMyCommands(){
        return await this.Get('getMyCommands')
    }

    async setMyCommands(options : SetMyCommandsOptions){
        return await this.Get('setMyCommands', options)
    }

    async sendMessage(options : SendMessageOptions){
        return await this.Get('sendMessage', options)
    }

    async forwardMessage(options : ForwardMessageOptions){
        return await this.Get('forwardMessage', options)
    }

    async copyMessage(options : CopyMessageOptions){
        return await this.Get('copyMessage', options)
    }

    

    async sendPhoto(options : SendPhotoOptions){
        return await this.Post('sendPhoto', options)
    }

    async sendDocument(options : SendDocumentOptions){
        return await this.Post('sendDocument', options)
    }
    
    async sendAudio(options : SendAudioOptions){
        return await this.Post('sendAudio', options)
    }
    
    async sendVideo(options : SendVideoOptions){
        return await this.Post('sendVideo', options)
    }
    
    async sendAnimation(options : SendAnimationOptions){
        return await this.Post('sendAnimation', options)
    }
    
    async sendVoice(options : SendVoiceOptions){
        return await this.Post('sendVoice', options)
    }
    
    async sendVideoNote(options : SendVideoNoteOptions){
        return await this.Post('sendVideoNote', options)
    }
    
    async sendMediaGroup(options : SendMediaGroupOptions){
        return await this.Post('sendMediaGroup', options)
    }
}



