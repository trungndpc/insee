package com.vn.insee.zalobot.worker.script.loyalty.question;

import com.vn.insee.zalobot.worker.script.Question;
import com.vn.insee.zalobot.zalo.ZMsg;
import com.vn.insee.zalobot.zalo.ZMsgFactory;
import com.vn.insee.zalobot.zalo.ZMsgWebhook;
import com.vn.insee.zalobot.zalo.webhook.msg.TextMsg;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class NumberFloorLoyaltyQuestion extends Question {
    private static final Pattern PATTERN = Pattern.compile("\\d+");
    private static final Logger LOGGER = LogManager.getLogger(NumberFloorLoyaltyQuestion.class);
    private Integer floor;

    public NumberFloorLoyaltyQuestion() {
        this.status = INIT_STATUS;
    }

    @Override
    public ZMsg build2Ask() throws Exception {
        this.status = ASKED_STATUS;
        return ZMsgFactory.INSTANCE.buildTextMsg("Anh/chị vui lòng cho biết tổng số sàn của công trình?");
    }

    @Override
    public boolean ans(ZMsgWebhook msgWebhook) throws Exception {
        if (msgWebhook instanceof TextMsg) {
            this.status = ACCEPTED_STATUS;
            try {
                TextMsg textMsg = (TextMsg) msgWebhook;
                String text = textMsg.message.text;
                this.floor = extractFromAns(text);
            } catch (Exception e) {
                LOGGER.error(e.getMessage(), e);
            }
        }
        return this.floor != null && this.floor > 0;
    }

    private static int extractFromAns(String text) {
        Matcher m = PATTERN.matcher(text);
        if (m.find()) {
            return Integer.parseInt(m.group());
        }
        return 0;
    }

    public Integer getFloor() {
        return floor;
    }

}
