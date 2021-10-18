package com.vn.insee.zalobot.zalo.webhook.msg;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.vn.insee.zalobot.zalo.ZMsgWebhook;

@JsonIgnoreProperties
public class TextMsg extends ZMsgWebhook {

    public Message message;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    public static class Message {
        public String text;

        @JsonProperty("msg_id")
        public String msgId;
    }
}


