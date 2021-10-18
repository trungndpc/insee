package com.vn.insee.zalobot.zalo;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public abstract class ZMsg {
    public String text;
    public Attachment attachment;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    public static class Attachment {
        public String type;
        public Payload payload;

        @JsonInclude(JsonInclude.Include.NON_NULL)
        public static class Payload {
            @JsonProperty("template_type")
            public String templateType;
            public List<Element> elements;
            public List<Button> buttons;

            @JsonInclude(JsonInclude.Include.NON_NULL)
            public static class Element {
                @JsonProperty("media_type")
                public String mediaType;

                @JsonProperty("attachment_id")
                public String attachmentId;

                public Integer width;
                public Integer height;
                public String title;
                public String subtitle;
                @JsonProperty("image_url")
                public String imageUrl;

                @JsonProperty("url")
                public String url;

                @JsonProperty("default_action")
                public Action action;

                @JsonInclude(JsonInclude.Include.NON_NULL)
                public static class Action {
                    public String type;
                    public String url;
                    public String payload;
                }

            }
            @JsonInclude(JsonInclude.Include.NON_NULL)
            public static class Button {
                public String title;
                public String type;
                public Object payload;

                @JsonInclude(JsonInclude.Include.NON_NULL)
                public static class ButtonPayload {
                    public String url;
                    public String content;
                    @JsonProperty("phone_code")
                    public String phoneCode;
                }
            }
        }
    }
}
