package com.vn.insee.zalobot.zalo;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.vn.insee.zalobot.exception.UnknownMsgException;
import com.vn.insee.zalobot.util.StringUtils;
import com.vn.insee.zalobot.zalo.webhook.msg.*;
import org.json.JSONObject;

import java.util.Arrays;
import java.util.List;

public class ZMsgFactory {
    public static final ZMsgFactory INSTANCE = new ZMsgFactory();
    private ObjectMapper objectMapper;

    private ZMsgFactory() {
        this.objectMapper = new ObjectMapper();
        this.objectMapper.disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES);
    }

    public ZMsgWebhook parse(String msg) throws UnknownMsgException, JsonProcessingException {
        JSONObject body = new JSONObject(msg);
        String event_name = body.optString("event_name", null);
        if (StringUtils.isEmpty(event_name)) {
            throw new UnknownMsgException();
        }
        ZMsgWebhook zMsgWebhook = null;
        switch (event_name) {
            case "follow" : {
                zMsgWebhook =  objectMapper.readValue(body.toString(), FollowMsg.class);
                break;
            }
            case "unfollow" : {
                zMsgWebhook =  objectMapper.readValue(body.toString(), UnFollowMsg.class);
                break;
            }
            case "user_submit_info" : {
                zMsgWebhook =  objectMapper.readValue(body.toString(), ShareInfoMsg.class);
                break;
            }
            case "user_send_text" : {
                zMsgWebhook =  objectMapper.readValue(body.toString(), TextMsg.class);
                break;
            }
            case "user_send_image" : {
                zMsgWebhook =  objectMapper.readValue(body.toString(), ImageMsg.class);
                break;
            }
        }
        if (zMsgWebhook == null) {
            throw new UnknownMsgException();
        }
        return zMsgWebhook;
    }


    public ZMsg buildTextMsg(String text) {
        ZMsg message = new ZMsg() {};
        message.text = text;
        return message;
    }

    public ZMsg buildImageMsg(String text, String url) {
        ZMsg.Attachment.Payload.Element element = new ZMsg.Attachment.Payload.Element();
        element.mediaType = "image";
        element.url = url;

        ZMsg.Attachment.Payload payload = new ZMsg.Attachment.Payload();
        payload.templateType = "media";
        payload.elements = Arrays.asList(element);

        ZMsg.Attachment attachment = new ZMsg.Attachment();
        attachment.type = "template";
        attachment.payload = payload;

        ZMsg message = new ZMsg() {};
        message.text = text;
        message.attachment = attachment;
        return message;
    }

    public ZMsg buildListTemplateMsg(List<ZMsg.Attachment.Payload.Element> elements) {
        ZMsg.Attachment.Payload payload = new ZMsg.Attachment.Payload();
        payload.templateType = "list";
        payload.elements = elements;

        ZMsg.Attachment attachment = new ZMsg.Attachment();
        attachment.type = "template";
        attachment.payload = payload;
        ZMsg message = new ZMsg() {};
        message.attachment = attachment;
        return message;
    }

}
