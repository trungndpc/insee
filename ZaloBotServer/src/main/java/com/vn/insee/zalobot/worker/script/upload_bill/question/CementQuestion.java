package com.vn.insee.zalobot.worker.script.upload_bill.question;

import com.vn.insee.zalobot.common.insee.CementManager;
import com.vn.insee.zalobot.common.insee.Product;
import com.vn.insee.zalobot.worker.script.Question;
import com.vn.insee.zalobot.zalo.ZMsg;
import com.vn.insee.zalobot.zalo.ZMsgFactory;
import com.vn.insee.zalobot.zalo.ZMsgWebhook;
import com.vn.insee.zalobot.zalo.ZaloService;
import com.vn.insee.zalobot.zalo.webhook.msg.TextMsg;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class CementQuestion extends Question {
    private static final Logger LOGGER = LogManager.getLogger(CementQuestion.class);
    private List<Integer> cementIds;
    private int selectedCement;

    public CementQuestion(List<Integer> cementIds) {
        this.status = INIT_STATUS;
        this.cementIds = cementIds;
    }

    @Override
    public ZMsg build2Ask() throws Exception {
        ZMsg.Attachment.Payload payload = new ZMsg.Attachment.Payload();
        payload.buttons = new ArrayList<>();
        for (Integer cementId: this.cementIds) {
            Product cement = CementManager.findById(cementId);
            ZMsg.Attachment.Payload.Button button = new ZMsg.Attachment.Payload.Button();
            button.type = "oa.query.show";
            button.title = cement.getName() + " " + cement.getVolumeOneBag() + "kg";
            button.payload = cement.getName();
            payload.buttons.add(button);
        }

        ZMsg.Attachment attachment = new ZMsg.Attachment();
        attachment.type = "template";
        attachment.payload = payload;
        ZMsg message = ZMsgFactory.INSTANCE.buildTextMsg("Anh/chị vui lòng chọn loại xi măng đã mua.");
        message.attachment = attachment;
        return message;
    }

    @Override
    public boolean ans(ZMsgWebhook msgWebhook) throws Exception {
        try {
            if (msgWebhook instanceof TextMsg) {
                this.status = ACCEPTED_STATUS;
                TextMsg textMsg = (TextMsg) msgWebhook;
                String text = textMsg.message.text;
                int cementId = extractFromAns(text);
                this.selectedCement = cementId;
                if (cementId <= 0) {
                    ZaloService.INSTANCE.sendMsg(msgWebhook.sender.id, wrong());
                }
            }
        } catch (Exception e) {
            LOGGER.error(e.getMessage());
        }
        return this.cementIds.contains(this.selectedCement);
    }

    private ZMsg wrong() {
        return ZMsgFactory.INSTANCE.buildTextMsg("Anh chọn xi măng trên mấy dòng xám xám đó cho dễ ạ");
    }

    private int extractFromAns(String text) {
        String tmp = text.replace("#", "");
        List<Product> productList = this.cementIds.stream()
                .map(e -> CementManager.findById(e)).collect(Collectors.toList());
        for (Product product : productList) {
            if (product.getName().equals(tmp)) {
                return product.getId();
            }
        }
        return -1;
    }

    public int getSelectedCement() {
        return selectedCement;
    }
}
