package com.vn.insee.zalobot.worker.script.find_promotion.question;

import com.vn.insee.zalobot.common.Constant;
import com.vn.insee.zalobot.common.type.TypePromotion;
import com.vn.insee.zalobot.util.StringUtils;
import com.vn.insee.zalobot.worker.script.Question;
import com.vn.insee.zalobot.worker.script.find_promotion.document.PromotionDocument;
import com.vn.insee.zalobot.zalo.ZMsg;
import com.vn.insee.zalobot.zalo.ZMsgFactory;
import com.vn.insee.zalobot.zalo.ZMsgWebhook;
import com.vn.insee.zalobot.zalo.webhook.msg.TextMsg;

import java.util.LinkedList;
import java.util.List;


public class PromotionQuestion extends Question {

    private List<PromotionDocument> documents;
    private PromotionDocument selectedPromotionDocument;
    private int selectedId = -1;

    public PromotionQuestion(List<PromotionDocument> documents) {
        this.documents = documents;
        this.status = INIT_STATUS;
    }

    @Override
    public ZMsg build2Ask() {
        List<ZMsg.Attachment.Payload.Element> elements = new LinkedList<>();
        for (int i = 0; i < 4 && i < documents.size(); i++) {
            PromotionDocument promotion = documents.get(i);
            int type = promotion.getType();
            ZMsg.Attachment.Payload.Element.Action ctrAction;
            if ((type == TypePromotion.NOW_CONSTRUCTION.getType() ||
                    type == TypePromotion.PREDICT_FOOTBALL.getType()
                    || type == TypePromotion.LOYALTY.getType()))  {
                ctrAction = new ZMsg.Attachment.Payload.Element.Action();
                ctrAction.type = "oa.query.show";
                ctrAction.payload = promotion.getTitle();
            }else {
                ctrAction = new ZMsg.Attachment.Payload.Element.Action();
                ctrAction.type = "oa.open.url";
                ctrAction.url = Constant.CLIENT_DOMAIN + "/khuyen-mai/" + promotion.getId();
            }
            ZMsg.Attachment.Payload.Element ctrElement = new ZMsg.Attachment.Payload.Element();
            ctrElement.title = promotion.getTitle();
            ctrElement.imageUrl = promotion.getCover();
            ctrElement.action = ctrAction;
            ctrElement.subtitle = promotion.getSummary();
            elements.add(ctrElement);
        }
        this.status = ASKED_STATUS;
        return ZMsgFactory.INSTANCE.buildListTemplateMsg(elements);
    }


    @Override
    public boolean ans(ZMsgWebhook msgWebhook) {
        if (msgWebhook instanceof TextMsg) {
            TextMsg textMsg = (TextMsg) msgWebhook;
            this.selectedId = extractFromAns(textMsg.message.text);
        }
        return isAccept(this.selectedId);
    }

    private int extractFromAns(String text) {
        for (PromotionDocument document: documents) {
            String title = StringUtils.removeAccent(document.getTitle()).trim();
            text = StringUtils.removeAccent(text).trim();
            if (title.equalsIgnoreCase(text)) {
                this.selectedPromotionDocument = document;
                return document.getId();
            }
        }
        return -1;
    }

    private boolean isAccept(int id) {
        return id > 0;
    }

    public int getSelectedId() {
        return selectedId;
    }

    public PromotionDocument getSelectedPromotionDocument() {
        return selectedPromotionDocument;
    }
}
