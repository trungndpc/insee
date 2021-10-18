package com.vn.insee.zalobot.worker.script.find_promotion.question;

import com.vn.insee.zalobot.common.Constant;
import com.vn.insee.zalobot.worker.script.Question;
import com.vn.insee.zalobot.worker.script.find_promotion.document.PromotionDocument;
import com.vn.insee.zalobot.zalo.ZMsg;
import com.vn.insee.zalobot.zalo.ZMsgFactory;
import com.vn.insee.zalobot.zalo.ZMsgWebhook;
import com.vn.insee.zalobot.zalo.webhook.msg.TextMsg;
import java.util.ArrayList;


public class PromotionDetailQuestion extends Question {
    private PromotionDocument promotionDocument;
    private boolean isPlay;

    public PromotionDetailQuestion(PromotionDocument promotionDocument) {
        this.promotionDocument = promotionDocument;
        this.status = INIT_STATUS;
    }

    @Override
    public ZMsg build2Ask() {
        ZMsg.Attachment.Payload.Button applyButton = new ZMsg.Attachment.Payload.Button();
        applyButton.type = "oa.query.show";
        applyButton.title = "Tham gia";
        applyButton.payload = "Tham gia";

        ZMsg.Attachment.Payload.Button ruleButton = new ZMsg.Attachment.Payload.Button();
        ruleButton.type = "oa.open.url";
        ruleButton.title = "Thể lệ chương trình";
        ZMsg.Attachment.Payload.Button.ButtonPayload buttonPayload = new ZMsg.Attachment.Payload.Button.ButtonPayload();
        buttonPayload.url = Constant.CLIENT_DOMAIN + "/khuyen-mai/" + promotionDocument.getId();
        ruleButton.payload = buttonPayload;

        ZMsg.Attachment.Payload payload = new ZMsg.Attachment.Payload();
        payload.buttons = new ArrayList<>();
        payload.buttons.add(applyButton);
        payload.buttons.add(ruleButton);

        ZMsg.Attachment attachment = new ZMsg.Attachment();
        attachment.type = "template";
        attachment.payload = payload;
        ZMsg message = ZMsgFactory.INSTANCE.buildTextMsg(this.promotionDocument.getSummary());
        message.attachment = attachment;
        return message;
    }

    @Override
    public boolean ans(ZMsgWebhook msgWebhook) {
        if (msgWebhook instanceof TextMsg) {
            TextMsg textMsg = (TextMsg) msgWebhook;
            this.isPlay = extractFromAns(textMsg.message.text);
        }
        return this.isPlay;
    }

    private boolean extractFromAns(String text) {
        if (text.equalsIgnoreCase("Tham gia")) {
            return true;
        }
        return false;
    }

    public boolean isPlay() {
        return isPlay;
    }
}
