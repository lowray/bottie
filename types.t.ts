type Context  = any
export type User = {
    id : number,
    is_bot : boolean,
    first_name : string,
    last_name? : string,
    username? : string,
    language_code? : string,
    can_join_groups? : boolean,
    can_read_all_group_messages? : boolean,
    supports_inline_queries? : boolean
}

export type MessageId = number | string | undefined
export type ChatId = MessageId

export interface Update{
    message? : Message
    update_id : number
    inline_query : Placeholder
    event : EventTypes
    type : UpdateType
    result : any[]
    chat : ChatType
}

export type Placeholder = any

export type Chat = {
    id : number,
    type? : string,
    title? : string,
    username : string,
    first_name? : string,
    last_name? : string,
    photo? : ChatPhoto,
    bio? : string,
    description? : string,
    invite_link? : string,
    pinned_message? : string,
    permissions? : ChatPermissions,
    slow_mode_delay? : number,
    sticker_set_name? : string,
    can_set_sticker_set? : boolean,
    linked_chat_id? : ChatId,
    location? : ChatLocation
}

export type Message = {
    message_id : MessageId,
    from? : User,
    sender_chat? : Chat,
    date : number,
    chat : Chat,
    forward_from? : User,
    forward_from_chat? : Chat
    forward_from_message_id? : MessageId,
    forward_signature? : string,
    forward_sender_name? : string,
    forward_date? : number,
    reply_to_message? : Message,
    via_bot? : User,
    edit_date? : number,
    media_group_id? : string,
    author_signature? : string,
    entities? : MessageEntity[],
    //updates : 
    text? : string,
    animation? : Animation,
    audio? : Audio,
    document? : Document,
    photo? : PhotoSize[],
    sticker? : Sticker,
    video? : Video,
    video_note? : VideoNote,
    voice? : Voice,
    caption? : string,
    caption_entities : MessageEntity[],
    contact : Contact,
    dice? : Dice,
    game? : Placeholder,
    poll? : Placeholder,
    venue? : Placeholder,
    location? : Location,
    new_chat_members? : User[],
    left_chat_member? :  User,
    new_chat_title? : string,
    new_chat_photo? : PhotoSize[],
    delete_chat_photo? : true,
    group_chat_created? : true,
    supergroup_chat_created? : true,
    channel_chat_created? : true,
    migrate_to_chat_id? : ChatId
    migrate_from_chat_id? : ChatId,
    pinned_message? : Message,
    invoice? : Placeholder,
    successful_payment? : Placeholder,
    connected_website? : string,
    passport_data? : Placeholder,
    proximity_alert_triggered? : Placeholder,
    reply_markup? : Placeholder 
}


type MessageEntity = {
    type : string,
    offset : number,
    length : number,
    url : string,
    user : User,
    language : string

}


export type SendMessageOptions = {
    chat_id : ChatId,
    text : any,
    parse_mode? : string,
    entities? : any,
    disable_web_page_preview? : boolean
    disable_notification? : boolean
    reply_to_message_id? : MessageId
    allow_sending_without_reply? : boolean
    reply_markup? : Placeholder
}

export type DeleteMessageOptions = {
    chat_id : ChatId
    message_id : MessageId
}

export type EditMessageTextOptions = {
    chat_id : ChatId
    message_id : MessageId
    inline_message_id? : MessageId
    text : string
    parse_mode? : string
    entities? : MessageEntity[]
    disable_web_page_preview? : boolean
    reply_markup? : Placeholder
}

export type ForwardMessageOptions = {
    chat_id	: ChatId
    from_chat_id : ChatId
    disable_notification? : boolean
    message_id : MessageId
}

export type CopyMessageOptions = {
    chat_id : ChatId
    from_chat_id : ChatId
    message_id : MessageId
    caption? : string
    parse_mode? : string
    caption_entities? : MessageEntity[]
    disable_notification? : boolean
    reply_to_message_id? : MessageId
    allow_sending_without_reply? : boolean
    reply_markup? : Placeholder
}

export type SendPhotoOptions = {
    chat_id : ChatId
    photo : any
    title? : string
    caption?  : string
    parse_mode? : string
    caption_entities? : MessageEntity[]
    disable_notification? : boolean
    reply_to_message_id? : MessageId
    allow_sending_without_reply? : boolean
    reply_markup? : Placeholder
}

export type SendAudioOptions = {
    chat_id	: ChatId
    audio	: any
    caption? : string
    parse_mode? : string
    caption_entities? : MessageEntity[]
    duration? : number
    performer? : string
    title? : string
    thumb? : any
    disable_notification? : boolean
    reply_to_message_id? : MessageId
    allow_sending_without_reply? : boolean
    reply_markup? : Placeholder
}

export type SendDocumentOptions = {
    chat_id	: ChatId
    document : any
    title? : string
    thumb? : any | string
    caption? : string
    parse_mode? : string
    caption_entities? : MessageEntity[]
    disable_content_type_detection? : boolean
    disable_notification? : boolean
    reply_to_message_id? : MessageId
    allow_sending_without_reply? : boolean
    reply_markup? : Placeholder
}


export type SendVideoOptions = {
    chat_id	: ChatId
    video : any
    duration? : number
    width? : number
    height? : number
    thumb? : any
    caption? : string 
    parse_mode? : string
    caption_entities? : MessageEntity[]
    supports_streaming? : boolean
    disable_notification? : boolean
    reply_to_message_id? : MessageId
    allow_sending_without_reply? : boolean
    reply_markup? : Placeholder
}

export type SendVoiceOptions = {
    chat_id : ChatId,
    voice : Placeholder,
    caption? : string,
    parse_mode? : string,
    caption_entities? : MessageEntity[],
    duration? : number,
    disable_notification? : boolean,
    reply_to_message_id? : MessageId,
    allow_sending_without_reply? : boolean,
    reply_markup? : Placeholder,
}

export type SendVideoNoteOptions = {
    chat_id : ChatId,
    video_note : Placeholder
    duration? : number,
    length? : number,
    tumb? : Placeholder,
    disable_notification? : boolean,
    reply_to_message_id? : MessageId,
    allow_sending_without_reply? : boolean,
    reply_markup? : Placeholder
}

export type SendMediaGroupOptions = {
    chat_id : ChatId,
    media : Placeholder[],
    disable_notification? : boolean
    reply_to_message_id? : MessageId,
    allow_sending_without_reply? : boolean
} 

export type SendAnimationOptions = {
    chat_id : ChatId
    animation : any
    duration? : number
    width? : number
    height? : number
    thumb? : any
    caption? : string
    parse_mode? : string
    caption_entities? : MessageEntity[]
    disable_notification? : boolean
    reply_to_message_id? : MessageId
    allow_sending_without_reply? : boolean
    reply_markup? : Placeholder
}


export type SetMyCommandsOptions = {
    commands : Placeholder[]
}

export type UpdateType = 'text' | 'animation' | 'audio' | 'document' | 'photo' | 'sticker' | 'video' | 'video_note' | 'voice' | 'contact' | 'dice' | 'poll' | 'venue' | 'location' | 'left_chat_member' | 'new_chat_member' | 'new_chat_members' | 'new_chat_title' | 'new_chat_photo' | 'delete_chat_photo' | 'group_chat_created' | 'supergroup_chat_created' | 'channel_chat_created' | 'migrate_to_chat_id' | 'migrate_from_chat_id' | 'pinned_message' | 'invoice' | 'successful_payment' | 'connected_website' | 'passport_data' | 'cpmmand'

export type ChatType = 'private' | 'group' | 'supergroup' | 'channel' | 'any'


export type Callback = (ctx : Context, next? : any)=>Context | null

export type ChatPhoto = {
    small_file_id : string,
    small_file_unique_id : string,
    big_file_id : string,
    big_file_unique_id : string,
}

export type ChatPermissions = {
    can_send_messages? : boolean,
    can_send_media_messages? : boolean,
    can_send_polls? : boolean,
    can_send_other_messages? : boolean,
    can_add_web_page_previews? : boolean,
    can_change_info? : boolean,
    can_invite_users? : boolean,
    can_pin_messages? : boolean
}

export type ChatLocation = {
    location : Location,
    address : string
}


export type Animation = {
    file_id : string,
    file_unique_id : string,
    width : number,
    height : number,
    duration : number,
    thumb? : PhotoSize,
    file_name? : string,
    mime_type? : string,
    file_size? : number
}


export type Audio = {
    file_id : string,
    file_unique_id : string,
    duration : number,
    performer? : string,
    title? : string,
    file_name? : string,
    mime_type? : string,
    file_size? : number,
    thumb : PhotoSize
}



export type Document = {
    file_id : string,
    file_unique_id : string,
    thumb? : PhotoSize,
    file_name? : string,
    mime_type? : string,
    file_size? : number,
}

export type Video = {
    file_id	: string
    file_unique_id : string
    width :	number	
    height : number	
    duration : number	
    thumb? : PhotoSize	
    file_name? : string	
    mime_type? : string	
    file_size? :	number	
}

export type VideoNote = {
    file_id: 	string
    file_unique_id: 	string	
    length: 	number	 
    duration: 	number	
    thumb?: 	PhotoSize	
    file_size?	: number	
}

export type Voice = {
    file_id : string
    file_unique_id : string
    duration	: number	
    mime_type?	: string	
    file_size?	: number	
}


export type Contact = {
    phone_number :	string	
    first_name :	string	
    last_name	 :string	
    user_id :	number	
    vcard	 :string	
}

export type Dice = {
    emoji : string,
    value  : number
}


export type PhotoSize = {
    file_id : string,
    file_unique_id : string,
    width : number,
    height : number,
    file_size? : number,
}

export type Location = {
    longitude : number,
    latitude : number,
    horizontal_accuracy	: number
    live_period? : number
    heading? : number
    proximity_alert_radius? : number
}


export type Sticker = {
    file_id	 : string
    file_unique_id : string
    width : number
    height	: number
    is_animated	: boolean
    thumb? : PhotoSize
    emoji? : string
    set_name? : string
    mask_position? : string
    file_size? : number	
}




export type ChatTypeRule = {
    value : null,
    callbacks : any,
    type : ChatType,
}

export const  updateTypes = ['text' , 'animation' , 'audio' , 'document' , 'photo' , 'sticker' , 'video' , 'video_note' , 'voice', 'contact' , 'dice' , 'poll' , 'venue' , 'location' , 'left_chat_member' , 'new_chat_member' , 'new_chat_members' , 'new_chat_title' , 'new_chat_photo' , 'delete_chat_photo' , 'group_chat_created' , 'supergroup_chat_created' , 'channel_chat_created' , 'migrate_to_chat_id' , 'migrate_from_chat_id' , 'pinned_message' , 'invoice' , 'successful_payment' , 'connected_website' , 'passport_data', 'command' ]

export const chatTypes = ['private' , 'group' , 'supergroup' , 'channel']

export type EventTypes =  'channel_post' | 'edited_channel_post' | 'message' | 'inline_query'

export const  eventTypes =  ['channel_post' , 'edited_channel_post' , 'message' , 'inline_query']

export type InlineKeyboardButtonOptions = {
    text : string
    url? : string
    login_url? : string 
    callback_data? : string
    switch_inline_query? : string
    switch_inline_query_current_chat? : string
    callback_game? : Placeholder
    pay? : boolean
}