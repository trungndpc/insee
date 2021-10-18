package com.vn.insee.zalobot.worker.script.loyalty.question;

import com.vn.insee.zalobot.worker.script.Question;
import com.vn.insee.zalobot.worker.script.upload_bill.question.NumberOfBagQuestion;
import com.vn.insee.zalobot.zalo.ZMsg;
import com.vn.insee.zalobot.zalo.ZMsgFactory;
import com.vn.insee.zalobot.zalo.ZMsgWebhook;
import com.vn.insee.zalobot.zalo.ZaloService;
import com.vn.insee.zalobot.zalo.webhook.msg.TextMsg;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class NumberOfBagLoyaltyQuestion extends Question {
    private static final Pattern PATTERN = Pattern.compile("\\d+");
    private static final Logger LOGGER = LogManager.getLogger(NumberOfBagQuestion.class);
    private int bags = 0;

    public NumberOfBagLoyaltyQuestion() {
        this.status = INIT_STATUS;
    }

    @Override
    public ZMsg build2Ask() throws Exception {
        return ZMsgFactory.INSTANCE.buildTextMsg("Anh/chị vui lòng nhập số lượng xi măng đã mua trong đơn hàng gần nhất. (đơn vị: bao)");
    }

    @Override
    public boolean ans(ZMsgWebhook msgWebhook) throws Exception {
        if (msgWebhook instanceof TextMsg) {
            try{
                TextMsg textMsg = (TextMsg) msgWebhook;
                String text = textMsg.message.text;
                int bag = extractFromAns(text);
                this.bags = bag;
            }catch (Exception e) {
                ZaloService.INSTANCE.sendMsg(msgWebhook.sender.id, unknownException());
            }
        }
        return this.bags > 0;
    }

    private ZMsg unknownException() {
        return ZMsgFactory.INSTANCE.buildTextMsg("Anh nhập số thôi ạ. ví dụ: 60 70");
    }


    private static int extractFromAns(String text) {
        Matcher m = PATTERN.matcher(text);
        if (m.find()) {
            return Integer.parseInt(m.group());
        }
        return 0;
    }

    public int getBags() {
        return bags;
    }
}
