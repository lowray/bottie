import Context from "./context.ts"

export type ChatId = string

export type UpdateTypes = 
    'callback_query'|
    'channel_post'|
    'chosen_inline_result'|
    'edited_channel_post'|
    'edited_message'|
    'inline_query'|
    'message'|
    'pre_checkout_query'|
    'shipping_query'|
    'poll'|
    'poll_answer'


  export const update_types = [
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
  ] as const


  export type MessageSubTypes = 
    'voice'|
    'video_note'|
    'video'|
    'animation'|
    'venue'|
    'text'|
    'supergroup_chat_created'|
    'successful_payment'|
    'sticker'|
    'pinned_message'|
    'photo'|
    'new_chat_title'|
    'new_chat_photo'|
    'new_chat_members'|
    'migrate_to_chat_id'|
    'migrate_from_chat_id'|
    'location'|
    'left_chat_member'|
    'invoice'|
    'group_chat_created'|
    'game'|
    'dice'|
    'document'|
    'delete_chat_photo'|
    'contact'|
    'channel_chat_created'|
    'audio'|
    'connected_website'|
    'passport_data'|
    'poll'  
  
  export const message_sub_types = [
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
  ] as const

export type Rule = {
    type : UpdateTypes | null
    subType : MessageSubTypes | null
    value : any
    callback : Callback[]
}



export type Callback = (context : Context, next : Function)=>unknown