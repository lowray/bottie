import Context from "./context.ts";
import Telegram from './telegram.ts'
import { MessageSubTypes, UpdateTypes, Rule, update_types, message_sub_types, Callback } from "./types.a.ts";
import { EventTypes, eventTypes, Update, updateTypes } from "./types.t.ts"
import { isIterable } from "./utils.ts";
import Middleware from './callback.js'

(String as any).prototype.equal = function(str : string){
    return { match : this == str, result : [str]}
};

(RegExp as any).prototype.equal = function(str : string){
    return{
        match : this.test(str),
        result : this.exec(str)
    }
};






export default class Bottie{
    token : string
    telegram : Telegram
    rules : Rule[] = []
    middlewares : any[] = []
    offset = 0
    options : any
    constructor(token : string, options = {timeout : 120}){
        this.token = token
        this.telegram = new Telegram(token)
        this.options = options
    }

    async handle(update : any){
        this.offset = update.update_id+1

        
        


        update_types.forEach(type=>{
            if(type in update){
                update.type = type
            }
        })
        message_sub_types.forEach(type=>{
            if(type in update[update.type]){
                update.subType = type
            }
        })
       
       
         
        this.rules.length ? this.rules.forEach(rule=>{
            //pass context to new middleware
            const Mi = new Middleware(new Context(this, update))
            this.middlewares.forEach(mw=>Mi.use(mw))
            //*  TYPE BASED RULES 
            if(rule.subType == 'text' && rule.value){
                if(rule.value == null || rule.value.equal(update[update.type]['text']).match){
                    update.result = rule.value.equal(update[update.type]['text']).result
                    rule.callback.forEach(callback=>Mi.use(callback))
                    Mi.go(()=>true)
                }
            }else{     
                // console.log(rule.subType, update.subType);
                // console.log(rule.type, update.type);
                
                //  console.log(
                //     (rule.type == update.type || update.type == null)
                //  );
                           
                if( (rule.type == update.type || rule.type == null) && (rule.subType == update.subType || update.subType == null) ){
                    rule.callback.forEach(callback=>Mi.use(callback))
                    Mi.go(()=>true)
                }
            }  
        }) : (()=>{
            const Mi = new Middleware(new Context(this, update))
            this.middlewares.forEach(mw=>Mi.use(mw))
            Mi.go(()=>true)
        })()

        return update

    }

    private async poll(){
        
        let req = await  this.telegram.Get('getUpdates', {offset : this.offset, timeout : this.options.timeout})
        
        if (req.status == 502) {
            await this.poll();
          } else if (req.status != 200) {
              
            console.error(await req.json())
            await new Promise(resolve => setTimeout(resolve, 1000));
            await this.poll()
          } else {
            let data = await req.json()            
            data.ok ? data.result.forEach((req : any)=>this.handle(req)) : console.error(data)
            await this.poll()
          }   
    }



    text(text : string[] | string, ...callback : any){
        if(isIterable(text)){
            (text as string[]).map(t=>{
                this.rules.push({
                    callback,
                    subType : 'text',
                    type : null,
                    value : t
                })
            })
        }else{
            this.rules.push({
                callback,
                subType : 'text',
                type : null,
                value : text
            })
        }
    }

    regex(regex : RegExp | RegExp[], ...callback : Callback[]){
        if(isIterable(regex)){
            (regex as RegExp[]).map(r=>{
                this.rules.push({
                    callback,
                    subType : 'text',
                    type : null,
                    value : r
                })
            })
        }else{
            this.rules.push({
                callback,
                subType : 'text',
                type : null,
                value : regex
            })
        }
    }


    on(type : MessageSubTypes, ...callbacks : Callback[]){
        this.rules.push({
            callback : callbacks,
            subType : type,
            type : 'message',
            value : null
        })
    }



    use(...callbacks : Callback[]){
        callbacks.forEach(cb=>this.middlewares.push(cb))
    }


    launch(){
        this.poll()
    }
}



