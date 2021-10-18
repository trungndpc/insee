package com.vn.insee.zalobot.worker.script.loyalty.question;

import com.vn.insee.zalobot.util.StringUtils;
import com.vn.insee.zalobot.worker.script.Question;
import com.vn.insee.zalobot.zalo.ZMsg;
import com.vn.insee.zalobot.zalo.ZMsgFactory;
import com.vn.insee.zalobot.zalo.ZMsgWebhook;
import com.vn.insee.zalobot.zalo.webhook.msg.TextMsg;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class AddressLoyaltyQuestion extends Question {
    private static final Logger LOGGER = LogManager.getLogger(AddressLoyaltyQuestion.class);
    private String address;

    @Override
    public ZMsg build2Ask() throws Exception {
        this.status = ASKED_STATUS;
        return ZMsgFactory.INSTANCE.buildTextMsg("Anh/chị vui lòng nhập địa chỉ công trình?");
    }

    @Override
    public boolean ans(ZMsgWebhook msgWebhook) throws Exception {
        if (msgWebhook instanceof TextMsg) {
            this.status = ACCEPTED_STATUS;
            TextMsg textMsg = (TextMsg) msgWebhook;
            String text = textMsg.message.text;
            this.address = text;
        }
        return StringUtils.isEmpty(this.address);
    }

    public String getAddress() {
        return address;
    }
}
