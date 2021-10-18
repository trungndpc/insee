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

public class SquareLoyaltyQuestion extends Question {
    private static final Pattern PATTERN = Pattern.compile("\\d+");
    private static final Logger LOGGER = LogManager.getLogger(SquareLoyaltyQuestion.class);
    private int square;

    public SquareLoyaltyQuestion() {
        this.status = INIT_STATUS;
    }

    @Override
    public ZMsg build2Ask() throws Exception {
        return ZMsgFactory.INSTANCE.buildTextMsg("Anh/chị vui lòng cho biết diện tích của một sàn xây dựng của công trình?");
    }

    @Override
    public boolean ans(ZMsgWebhook msgWebhook) throws Exception {
        if (msgWebhook instanceof TextMsg) {
            this.status = ACCEPTED_STATUS;
            TextMsg textMsg = (TextMsg) msgWebhook;
            String text = textMsg.message.text;
            this.square =  extractFromAns(text);
        }
        return this.square > 0;
    }

    private static int extractFromAns(String text) {
        Matcher m = PATTERN.matcher(text);
        if (m.find()) {
            return Integer.parseInt(m.group());
        }
        return 0;
    }

    public Integer getSquare() {
        return square;
    }
}
