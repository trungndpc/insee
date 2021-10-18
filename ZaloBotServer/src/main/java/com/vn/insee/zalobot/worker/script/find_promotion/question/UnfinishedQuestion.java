package com.vn.insee.zalobot.worker.script.find_promotion.question;

import com.vn.insee.zalobot.worker.script.Question;
import com.vn.insee.zalobot.zalo.ZMsg;
import com.vn.insee.zalobot.zalo.ZMsgFactory;
import com.vn.insee.zalobot.zalo.ZMsgWebhook;
import com.vn.insee.zalobot.zalo.webhook.msg.TextMsg;

import java.util.Arrays;

public class UnfinishedQuestion extends Question {
    public static final int MAKE_NEW_FORM = 1;
    public static final int CONTINUE_EXITS_FORM = 2;
    private int action;

    @Override
    public ZMsg build2Ask() {
        ZMsg.Attachment.Payload.Button newFormButton = new ZMsg.Attachment.Payload.Button();
        newFormButton.type = "oa.query.show";
        newFormButton.title = "Làm đơn mới";
        newFormButton.payload = "Làm đơn mới";

        ZMsg.Attachment.Payload.Button oldButton = new ZMsg.Attachment.Payload.Button();
        oldButton.type = "oa.query.show";
        oldButton.title = "Bổ sung TT đơn cũ";
        oldButton.payload = "Bổ sung TT đơn cũ";

        ZMsg.Attachment.Payload payload = new ZMsg.Attachment.Payload();
        payload.buttons = Arrays.asList(newFormButton, oldButton);
        ZMsg.Attachment attachment = new ZMsg.Attachment();
        attachment.type = "template";
        attachment.payload = payload;

        ZMsg message = ZMsgFactory.INSTANCE.buildTextMsg("Anh/chị có đơn tham gia khuyến mãi chưa hoàn tất, vui lòng chọn làm đơn mới hay bổ sung thông tin đơn cũ");
        message.attachment = attachment;
        return message;
    }

    @Override
    public boolean ans(ZMsgWebhook msgWebhook) {
        if (msgWebhook instanceof TextMsg) {
            TextMsg textMsg = (TextMsg) msgWebhook;
            this.action = extractFromAns(textMsg.message.text);
        }
        return isAccept();
    }

    private int extractFromAns(String text) {
        if ("Làm đơn mới".equalsIgnoreCase(text)) {
            return MAKE_NEW_FORM;
        }
        if ("Bổ sung TT đơn cũ".equalsIgnoreCase(text)) {
            return CONTINUE_EXITS_FORM;
        }
        return 0;
    }

    public int getAction() {
        return action;
    }

    private boolean isAccept() {
        return this.action == MAKE_NEW_FORM || this.action == CONTINUE_EXITS_FORM;
    }

}
