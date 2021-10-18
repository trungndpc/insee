package com.vn.insee.zalobot.zalo.webhook.msg;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.vn.insee.zalobot.zalo.ZMsgWebhook;

import java.util.List;

@JsonIgnoreProperties
public class ImageMsg extends ZMsgWebhook {

    public Message message;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    public static class Message {
        public String text;

        @JsonProperty("msg_id")
        public String msgId;

        @JsonProperty("attachments")
        public List<Attachment> attachments;

    }
    @JsonInclude(JsonInclude.Include.NON_NULL)
    public static class Attachment {
        public String type;
        public Payload payload;

        @JsonInclude(JsonInclude.Include.NON_NULL)
        public static class Payload {
            public String thumbnail;
            public String url;
        }
    }

}


