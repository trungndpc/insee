package com.vn.insee.zalobot.worker.script.loyalty.question;

import com.vn.insee.zalobot.worker.script.Question;
import com.vn.insee.zalobot.worker.script.loyalty.document.ConstructionLoyaltyDocument;
import com.vn.insee.zalobot.zalo.ZMsg;
import com.vn.insee.zalobot.zalo.ZMsgFactory;
import com.vn.insee.zalobot.zalo.ZMsgWebhook;
import com.vn.insee.zalobot.zalo.webhook.msg.TextMsg;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class OldConstructionLoyaltyQuestion extends Question {
    private static final Logger LOGGER = LogManager.getLogger(OldConstructionLoyaltyQuestion.class);
    private List<ConstructionLoyaltyDocument> constructions;
    private Integer constructionId;

    public OldConstructionLoyaltyQuestion(List<ConstructionLoyaltyDocument> constructions) {
        this.status = INIT_STATUS;
        this.constructions = constructions;
    }

    @Override
    public ZMsg build2Ask() throws Exception {
        this.status = ASKED_STATUS;
        ZMsg message = ZMsgFactory.INSTANCE.buildTextMsg("Anh/chị tham gia cho công trình cũ hay mới?");
        ZMsg.Attachment.Payload payload = new ZMsg.Attachment.Payload();
        payload.buttons = new ArrayList<>();
        ZMsg.Attachment.Payload.Button newButton = new ZMsg.Attachment.Payload.Button();
        newButton.type = "oa.query.show";
        newButton.title = "Công trình mới";
        newButton.payload = "Công trình mới";
        payload.buttons.add(newButton);

        for (ConstructionLoyaltyDocument construction : constructions) {
            ZMsg.Attachment.Payload.Button button = new ZMsg.Attachment.Payload.Button();
            button.type = "oa.query.show";
            button.title = construction.getAddress();
            button.payload = construction.getAddress();
            payload.buttons.add(button);
        }
        ZMsg.Attachment attachment = new ZMsg.Attachment();
        attachment.type = "template";
        attachment.payload = payload;
        message.attachment = attachment;
        return message;
    }

    @Override
    public boolean ans(ZMsgWebhook msgWebhook) throws Exception {
        if (msgWebhook instanceof TextMsg) {
            this.status = ACCEPTED_STATUS;
            TextMsg textMsg = (TextMsg) msgWebhook;
            String text = textMsg.message.text;
            if ("Công trình mới".equals(text)) {
                this.constructionId = 0;
            }else {
                Optional<ConstructionLoyaltyDocument> oldConstruction = this.constructions.stream()
                        .filter(c -> c.getAddress().equalsIgnoreCase(text)).findFirst();
                if (oldConstruction.isPresent()) {
                    this.constructionId = oldConstruction.get().getId();
                }
            }
        }
        return this.constructionId != null;
    }

    public Integer getConstructionId() {
        return constructionId;
    }
}
