package com.vn.insee.zalobot.worker.script.loyalty.question;

import com.vn.insee.zalobot.worker.script.Question;
import com.vn.insee.zalobot.zalo.ZMsg;
import com.vn.insee.zalobot.zalo.ZMsgFactory;
import com.vn.insee.zalobot.zalo.ZMsgWebhook;
import com.vn.insee.zalobot.zalo.webhook.msg.TextMsg;
import java.util.ArrayList;


public class IsMixCementLoyaltyQuestion extends Question {
    private Boolean isMixCement;

    public IsMixCementLoyaltyQuestion() {
        this.status = INIT_STATUS;
    }

    @Override
    public ZMsg build2Ask() throws Exception {
        this.status = ASKED_STATUS;
        ZMsg.Attachment.Payload payload = new ZMsg.Attachment.Payload();
        payload.buttons = new ArrayList<>();
        ZMsg.Attachment.Payload.Button done_button = new ZMsg.Attachment.Payload.Button();
        done_button.type = "oa.query.show";
        done_button.title = "Có";
        done_button.payload = "Có";
        payload.buttons.add(done_button);

        ZMsg.Attachment.Payload.Button wait_button = new ZMsg.Attachment.Payload.Button();
        wait_button.type = "oa.query.show";
        wait_button.title = "Không";
        wait_button.payload = "Không";
        payload.buttons.add(wait_button);

        ZMsg.Attachment attachment = new ZMsg.Attachment();
        attachment.type = "template";
        attachment.payload = payload;
        ZMsg message = ZMsgFactory.INSTANCE.buildTextMsg("Anh/chị có sử dụng bê tông trộn sẵn không?");
        message.attachment = attachment;
        return message;
    }

    @Override
    public boolean ans(ZMsgWebhook msgWebhook) throws Exception {
        if (msgWebhook instanceof TextMsg) {
            this.status = ACCEPTED_STATUS;
            TextMsg textMsg = (TextMsg) msgWebhook;
            String text = textMsg.message.text;
            if ("Có".equals(text)) {
                this.isMixCement = true;
            }
            if ("Không".equals(text)) {
                this.isMixCement = false;
            }
        }
        return this.isMixCement != null;
    }


    public Boolean getMixCement() {
        return isMixCement;
    }
}
